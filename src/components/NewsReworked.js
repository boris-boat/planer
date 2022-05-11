import React from "react";
import { useStateContext } from "./StateContext";
import "../App.css";
import { Container, ListGroup, Col, Row, Card } from "react-bootstrap";

import { useEffect, useState } from "react";
import Topnavbar from "./navbar";

const NewsReworked = () => {
  const { search } = useStateContext();
  const { REACT_APP_API_URL } = process.env;
  const [news, setNews] = useState([]);
  const getNews = async () => {
    fetch(REACT_APP_API_URL + "/getnews")
      .then((res) => res.json())
      .then((result) => setNews(result));
  };
  useEffect(() => {
    getNews();
  }, [news]);
  
  return (
    <Container fluid>
      <Row>
        <Topnavbar />
      </Row>

      <Container fluid className="mt-5">
        {" "}
        <Row>
          <Col>
            <h2>N1</h2>
            <Card>
              {" "}
              {news
                ? news
                    .filter((item) => {
                      if (item.guid.includes("n1")) {
                        return item;
                      }
                    })
                    .filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val.title.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((item) => {
                      return (
                        <ListGroup.Item>
                          <ListGroup.Item key={item.link}>
                            {item.title} <br></br>
                            <a rel="noreferrer noopener" href={`${item.link}`}>
                              Link
                            </a>
                          </ListGroup.Item>
                        </ListGroup.Item>
                      );
                    })
                : ""}
            </Card>
          </Col>

          <Col>
            <h2>Blic</h2>
            <Card>
              {news
                ? news
                    .filter((item) => {
                      if (item.guid.includes("blic")) {
                        return item;
                      }
                    })
                    .filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val.title.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((item) => {
                      return (
                        <ListGroup.Item>
                          <ListGroup.Item key={item.link}>
                            {item.title} <br></br>
                            <a rel="noreferrer noopener" href={`${item.link}`}>
                              Link
                            </a>
                          </ListGroup.Item>
                        </ListGroup.Item>
                      );
                    })
                : ""}
            </Card>
          </Col>
          <Col>
            <h2>Danas</h2>
            <Card>
              {news
                ? news
                    .filter((item) => {
                      if (item.guid.includes("danas")) {
                        return item;
                      }
                    })
                    .filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val.title.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((item) => {
                      return (
                        <ListGroup.Item>
                          <ListGroup.Item key={item.link}>
                            {item.title} <br></br>
                            <a rel="noreferrer noopener" href={`${item.link}`}>
                              Link
                            </a>
                          </ListGroup.Item>
                        </ListGroup.Item>
                      );
                    })
                : ""}
            </Card>
          </Col>
          <Col>
            <h2>Mozzart</h2>
            <Card>
              {news
                ? news
                    .filter((item) => {
                      if (item.guid.includes("mozzart")) {
                        return item;
                      }
                    })
                    .filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val.title.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((item) => {
                      return (
                        <ListGroup.Item>
                          <ListGroup.Item key={item.link}>
                            {item.title} <br></br>
                            <a rel="noreferrer noopener" href={`${item.link}`}>
                              Link
                            </a>
                          </ListGroup.Item>
                        </ListGroup.Item>
                      );
                    })
                : ""}
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
export default NewsReworked;
