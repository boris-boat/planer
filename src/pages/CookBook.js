import React, { useState, useRef } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import Recept from "../components/Recept";
import ingredients from "../components/ingredients";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useStateContext } from "../components/StateContext";
const CookBook = () => {
  const { REACT_APP_COOKBOOK_API } = process.env;
  const { setSearchBar } = useStateContext();
  let base = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${REACT_APP_COOKBOOK_API}&addRecipeInformation=true&number=5&sort=random`;
  let query = [];
  const [multiSelections, setMultiSelections] = useState([]);
  const [foundRecipes, setFoundRecipes] = useState("");
  const ref = useRef();
  const handleSearch = async () => {
    multiSelections.map((selection) => query.push(selection.label));
    createQuery();

    const response = await fetch(base);
    const { ...data } = await response.json();
    setFoundRecipes(data);
  };
  setSearchBar(false);
  const createQuery = () => {
    multiSelections.forEach((ajtem) => {
      base += `&includeIngredients=${ajtem.label}`;
    });
  };

  return (
    <Container>
      <Container
        className="d-flex flex-column justify-content-center align-items-center flex-wrap"
        style={{ marginTop: "200px" }}
      >
        <Container
          className="justify-content-center align-items-center d-flex flex-column"
          style={{ width: "80%", textAlign: "center" }}
        >
          <Container style={{fontFamily : "Noto Serif",fontSize:"30px"}}>Welcome to the ultimate cooking experience!</Container>
          <Container className="d-flex justify-content-center mt-3">
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
            <Container className="d-flex justify-content-center align-items-center align-content-center mt-2 space-between">
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
          <Col
            style={{ width: "100%" }}
            className="d-flex justify-content-center align-items-center align-content-center mt-3"
          >
            {foundRecipes ? (
              <Recept recipes={foundRecipes} />
            ) : (
              <div>
                <h1>Please select ingredients and press search!</h1>
              </div>
            )}
          </Col>
        </Container>
      </Container>
    </Container>
  );
};

export default CookBook;
