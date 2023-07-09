import React, { useState, useRef } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import Recept from "../../components/Recept";
import ingredients from "../../components/ingredientsData";
import "react-bootstrap-typeahead/css/Typeahead.css";

const CookBook = () => {
  const ref = useRef();
  const { REACT_APP_COOKBOOK_API } = process.env;
  const [multiSelections, setMultiSelections] = useState([]);
  const [foundRecipes, setFoundRecipes] = useState("");
  //base querry where rest of info is added
  let base = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${REACT_APP_COOKBOOK_API}&addRecipeInformation=true&number=5&sort=random`;

  //creates a querry to be used for search
  const createQuery = () => {
    multiSelections.forEach((ajtem) => {
      base += `&includeIngredients=${ajtem.label}`;
    });
  };
  const handleSearch = async () => {
    createQuery();
    const response = await fetch(base);
    const { ...data } = await response.json();
    setFoundRecipes(data);
  };

  const center =
    "d-flex justify-content-center align-items-center align-content-center";
  return (
    <Container>
      <Container
        className={`flex-column  flex-wrap ${center}`}
        style={{ paddingTop: "130px" }}
      >
        <Container
          className="justify-content-center align-items-center d-flex flex-column"
          style={{ width: "80%", textAlign: "center" }}
        >
          <Container
            style={{
              fontFamily: "Noto Serif",
              fontSize: "30px",
              color: "white",
            }}
          >
            Welcome to the ultimate cooking experience!
          </Container>
          <Container
            className="d-flex justify-content-center mt-3"
            style={{ color: "white" }}
          >
            Please select as many ingredients as you like and the algorithm will
            provide a recipe with those ingredients included !
          </Container>
          <Col style={{ width: "100%", marginTop: "20px" }}>
            <Form.Group>
              <Typeahead
                ref={ref}
                onChange={setMultiSelections}
                selected={multiSelections}
                options={ingredients}
                id="basic-typeahead-multiple"
                multiple
                placeholder="Choose several ingredients..."
              />
            </Form.Group>
            <Container className={`${center}  pt-3 space-between`}>
              <Button onClick={handleSearch}>Search</Button>
              <Button
                onClick={() => {
                  ref.current.clear();
                  setFoundRecipes("");
                  setMultiSelections([]);
                }}
                style={{ marginLeft: "20px" }}
              >
                Clear
              </Button>
            </Container>
          </Col>
          <Col style={{ width: "100%", paddingTop: "10px" }}>
            {foundRecipes ? (
              <Recept recipes={foundRecipes} />
            ) : (
              <div>
                <h1 style={{ color: "white" }}>
                  Please select ingredients and press search!
                </h1>
              </div>
            )}
          </Col>
        </Container>
      </Container>
    </Container>
  );
};

export default CookBook;
