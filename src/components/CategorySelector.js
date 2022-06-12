import React from "react";
import { Button, Container } from "react-bootstrap";
import { useStateContext } from "./StateContext";

const CategorySelector = () => {
  const { setCategory } = useStateContext();
  
  return (
    <Container fluid className="button-container mb-3 d-flex">
      <Button
      
        className="btn-sm"
        variant="success"
        onClick={() => setCategory("General")}
      >
        General
      </Button>{" "}
      <Button
      
        className="btn-sm"
        variant="success"
        onClick={() => setCategory("Reminders")}
      >
        Reminders
      </Button>{" "}
      <Button
    
        className="btn-sm"
        variant="success"
        onClick={() => setCategory("Shoping List")}
      >
        Shoping List
      </Button>{" "}
      <Button
       
        className="btn-sm"
        class="btn-l"
        variant="success"
        onClick={() => setCategory("Everything")}
      >
        Everything
      </Button>{" "}
    </Container>
  );
};

export default CategorySelector;
