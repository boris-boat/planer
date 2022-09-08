import React from "react";
import useFetch from "../../customHooks/useFetch";
import "../../App.css";
import { Container, ListGroup, Col, Row, Card } from "react-bootstrap";
import LinearProgress from "@mui/material/LinearProgress";
const NewsReworked = () => {
  const { REACT_APP_API_URL } = process.env;

  //sends fetch to node server which returns sorted news
  //const { data } = useFetch(REACT_APP_API_URL + "/news/getnews");
  const { data } = useFetch("http://localhost:3001/news/getnews");
  const filterNews = (news, filter) => {
    let data = news?.filter((item) => item.guid.includes(filter));
    return data;
  };

  return (
    <Container fluid>
      <Container fluid style={{ paddingTop: "60px" }}>
        <Row>
          <Col style={{ minWidth: "300px" }}>
            <h2>N1</h2>
            <Card>
              {data?.rssFeed.length > 1 ? (
                filterNews(data.rssFeed, "n1").map((item) => {
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
              {data?.rssFeed.length > 1 ? (
                filterNews(data.rssFeed, "blic").map((item) => {
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
              {data?.rssFeed.length > 1 ? (
                filterNews(data.rssFeed, "danas").map((item) => {
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
            <Card style={{ marginBottom: "10px" }}>
              {data?.rssFeed.length > 1 ? (
                filterNews(data.rssFeed, "mozzart").map((item) => {
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
