import React, { useState, useEffect,useRef } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import Recept from "../components/Recept";
import ingredients from "../components/ingredients";
import "react-bootstrap-typeahead/css/Typeahead.css";
const CookBook = () => {
  const { REACT_APP_COOKBOOK_API } = process.env;

  let base = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${REACT_APP_COOKBOOK_API}&addRecipeInformation=true&number=5`;
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

  const createQuery = () => {
    multiSelections.forEach((ajtem) => {
      base += `&includeIngredients=${ajtem.label}`;
    });
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center flex-wrap"
      style={{ marginTop : "200px"}}
    >
      
      <Container
        className="justify-content-center align-items-center d-flex flex-column"
        style={{ width: "60%"}}
      ><Container className="d-flex justify-content-center align-items-center">
      Welcome to the ultimate cooking experience!Please select as many
      ingredients as you like and the algorithm will provide a recipe with
      those ingredients included !
    </Container>
        <Col style={{ width: "100%" }}>
        
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
            <Container className="d-flex justify-content-center align-items-center align-content-center">
              <Button onClick={handleSearch}>Search</Button>
              <Button onClick={
                () => {
                  ref.current.clear()
                  setFoundRecipes("")
                }
               
                }>Clear</Button>
            </Container>
         
        </Col>
        <Col style={{width : "100%"}} className="d-flex">
         
            {foundRecipes ? (
              <Recept recipes={foundRecipes} />
            ) : (
              <h1>Please select ingredients and press search!</h1>
            )}
         
        </Col>
      </Container>
    </Container>
  );
};

export default CookBook;
