/* eslint-disable no-undef */
import React, { useState } from "react";
import useFetch from "../../customHooks/useFetch";
import "../../App.css";
import { Container, ListGroup, Col, Row, Card } from "react-bootstrap";
import LinearProgress from "@mui/material/LinearProgress";
const NewsReworked = () => {
  const { REACT_APP_API_URL } = process.env;

  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useFetch(REACT_APP_API_URL + "/news/getnews");

  const filterNews = (news, filter) => {
    let data = news?.filter((item) => item.guid.includes(filter));
    return data;
  };
  return (
    <Container fluid>
      <Container fluid style={{ paddingTop: "60px" }}>
        <div style={{ width: "350px", margin: "0 auto",paddingTop:"15px" }}>
          {data ? (
            <>
              <Card style={{ width: "100%",padding:"10px"}}>
                <label htmlFor="searchNews" style={{ textAlign: "center" }}>
                  Search news
                </label>
                <input
                  type="text"
                  id="searchNews"
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                  }}
                />
              </Card>
              <Col style={{ minWidth: "300px" }}>
                <Card>
                  {searchQuery
                    ? data?.rssFeedFull
                        .filter((item) =>
                          item.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
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
                    : null}
                </Card>
              </Col>
            </>
          ) : null}
        </div>
        {!searchQuery && (
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
        )}
      </Container>
    </Container>
  );
};
export default NewsReworked;
