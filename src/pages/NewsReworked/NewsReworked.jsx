import React from "react";
import useFetch from "../../customHooks/useFetch";
import "../../App.css";
import { Container, ListGroup, Col, Row, Card } from "react-bootstrap";
import LinearProgress from "@mui/material/LinearProgress";
const NewsReworked = () => {
  const { REACT_APP_API_URL } = process.env;

  //sends fetch to node server which returns sorted news
  const { data } = useFetch(REACT_APP_API_URL + "/news/getnews");

  return (
    <Container fluid>
      <Container fluid style={{ paddingTop: "60px" }}>
        <Row>
          <Col style={{ minWidth: "300px" }}>
            <h2>N1</h2>
            <Card>
              {data?.length > 1 ? (
                data
                  .filter((item) => {
                    if (item.guid.includes("n1")) {
                      return item;
                    }
                    return null;
                  })

                  .map((item) => {
                    return (
                      <ListGroup.Item key={item.link}>
                        {item.title} <br></br>
                        <a
                          rel="noreferrer noopener"
                          target="_blank"
                          href={`${item.link}`}
                        >
                          Link
                        </a>
                      </ListGroup.Item>
                    );
                  })
              ) : (
                <LinearProgress />
              )}
            </Card>
          </Col>

          <Col style={{ minWidth: "300px" }}>
            <h2>Blic</h2>
            <Card>
              {data?.length > 1 ? (
                data
                  .filter((item) => {
                    if (item.guid.includes("blic")) {
                      return item;
                    }
                    return null;
                  })

                  .map((item) => {
                    return (
                      <ListGroup.Item key={item.link}>
                        {item.title} <br></br>
                        <a
                          rel="noreferrer noopener"
                          target="_blank"
                          href={`${item.link}`}
                        >
                          Link
                        </a>
                      </ListGroup.Item>
                    );
                  })
              ) : (
                <LinearProgress />
              )}
            </Card>
          </Col>
          <Col style={{ minWidth: "300px" }}>
            <h2>Danas</h2>
            <Card>
              {data?.length > 1 ? (
                data
                  .filter((item) => {
                    if (item.guid.includes("danas")) {
                      return item;
                    }
                    return null;
                  })

                  .map((item) => {
                    return (
                      <ListGroup.Item key={item.link}>
                        {item.title} <br></br>
                        <a
                          rel="noreferrer noopener"
                          target="_blank"
                          href={`${item.link}`}
                        >
                          Link
                        </a>
                      </ListGroup.Item>
                    );
                  })
              ) : (
                <LinearProgress />
              )}
            </Card>
          </Col>
          <Col style={{ minWidth: "300px" }}>
            <h2>Mozzart</h2>
            <Card>
              {data?.length > 1 ? (
                data
                  .filter((item) => {
                    if (item.guid.includes("mozzart")) {
                      return item;
                    }
                    return null;
                  })

                  .map((item) => {
                    return (
                      <ListGroup.Item key={item.link}>
                        {item.title} <br></br>
                        <a
                          rel="noreferrer noopener"
                          target="_blank"
                          href={`${item.link}`}
                        >
                          Link
                        </a>
                      </ListGroup.Item>
                    );
                  })
              ) : (
                <LinearProgress />
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
export default NewsReworked;
