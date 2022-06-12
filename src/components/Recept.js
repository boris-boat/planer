import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const Recept = ({ recipes }) => {
  console.log(recipes.results);

  return (
    <div
      style={{ width: "100%" }}
      className="d-flex flex-column justify-content-center align-items-center align-content-center "
    >
      {recipes ? (
        recipes.results.map((item) => {
          item.dishTypes.length = 3
          return (
            <Card style={{ height: "150px", width: "300px" }} fluid>
              <Row style={{width :"300px",marginLeft:"5px"}} >
                
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ height: "100px", width: "100px", padding: "0" }}
                />
              <Col>{item.dishTypes.map((item)=> <h5>{item}</h5>)}</Col>
              </Row>{" "}
              
              
              <Card.Text>
                {" "}
                <a
                  rel="noreferrer noopener"
                  target="_blank"
                  href={item.sourceUrl}
                >
                  {item.title}
                </a>
                {}
              </Card.Text>
            </Card>
          );
        })
      ) : (
        <h1>No recipes found!</h1>
      )}
    </div>
  );
};

export default Recept;
