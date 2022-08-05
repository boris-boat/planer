import React from "react";
import { Button, Container } from "react-bootstrap";
import { useStateContext } from "./StateContext";
import "../App.css";
const CategorySelector = () => {
  const { setCategory } = useStateContext();
  const categories = ["General", "Reminders", "Shoping List", "Everything"];

  //category selector for todo app
  return (
    <Container
      className="button-container mb-3 d-flex  justify-content-center align-items-center categorySelector"
      style={{ padding: "0" }}
    >
      {categories.map((cat) => (
        <Button
          key={cat}
          className="btn-sm"
          variant="success"
          onClick={() => setCategory(cat)}
        >
          {cat}
        </Button>
      ))}
    </Container>
  );
};

export default CategorySelector;
