import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const Recept = ({ recipes }) => {
  //single recipe result for cookbook app
  return (
    <div  
      style={{ width: "100%" }}
      className="d-flex flex-row flex-wrap justify-content-center align-items-center align-content-center "
    >
      {recipes.results.length !== 0 ? (
        recipes.results.map((item) => {
          item.dishTypes.length = 3;
          return (
            <Card style={{ minHeight: "165px", minWidth: "300px",maxWidth : "300px" }} key={item.title}>
              <Row style={{ width: "300px", marginLeft: "5px" }}>
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ height: "100px", width: "130px", padding: "0" ,marginTop : "5px"}}
                />
                <Col style={{marginTop : "5px"}}>
                  {item.dishTypes.map((dishType) => (
                    <h5 key={dishType}>{dishType}</h5>
                  ))}
                </Col>
              </Row>

              <Card.Text style={{marginTop : "10px"}}>
                <a style={{wordWrap : "break-word",marginTop : "10px"}}
                  rel="noreferrer noopener"
                  target="_blank"
                  href={item.sourceUrl}
                >
                  {item.title}
                </a>
              </Card.Text>
            </Card>
          );
        })
      ) : (
        <div>
          <h1>No recipes found!</h1>
        </div>
      )}
    </div>
  );
};

export default Recept;
