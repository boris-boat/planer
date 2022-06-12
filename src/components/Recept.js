import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const Recept = ({ recipes }) => {
  console.log(recipes.results);
  return (
    <div style={{ width: "100%" }} className="d-flex flex-column justify-content-center align-items-center align-content-center ">
      {recipes
        ? recipes.results.map((item) => {
            return (
              <Card style={{ height: "150px",width: "300px" }} fluid>
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ height: "100px", width: "100px" }}
                />
                
                  {" "}
                  <Card.Text> <a
                    rel="noreferrer noopener"
                    target="_blank"
                    href={item.sourceUrl}
                  >
                    {item.title}
                  </a></Card.Text>
                 
          
              </Card>
            );
          })
        : null}
    </div>
  );
};

export default Recept;
