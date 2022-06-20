import React from "react";
import { useStateContext } from "../components/StateContext";
import "../App.css";
import { Container, ListGroup, Col, Row, Card } from "react-bootstrap";

import { useEffect, useState } from "react";

import LinearProgress from "@mui/material/LinearProgress";
const NewsReworked = () => {
  

  const { search, setSearchBar } = useStateContext();
  const { REACT_APP_API_URL } = process.env;
  const [news, setNews] = useState([]);
  const getNews = async () => {
    fetch(REACT_APP_API_URL + "/getnews")
      .then((res) => res.json())
      .then((result) => setNews(result));
  };


  useEffect(() => {
    getNews();
    setSearchBar(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  return (
    <Container fluid>
      
      <>""</>
      <Container fluid style={{paddingTop : "40px"}}>
        {" "}
        <Row>
          <Col style={{minWidth : "300px"}} >
            <h2>N1</h2>
            <Card >
              {" "}
              {news.length > 1 ? (
                news
                  .filter((item) => {
                    if (item.guid.includes("n1")) {
                      return item;
                    } return null
                  })
                  .filter((val) => {
                    if (search === "") {
                      return val;
                    } else if (
                      val.title.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return val;
                    }return null
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

          <Col style={{minWidth : "300px"}}>
            <h2>Blic</h2>
            <Card>
              {news.length > 1 ? (
                news
                  .filter((item) => {
                    if (item.guid.includes("blic")) {
                      return item;
                    }return null
                  })
                  .filter((val) => {
                    if (search === "") {
                      return val;
                    } else if (
                      val.title.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return val;
                    }return null
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
          <Col style={{minWidth : "300px"}}>
            <h2>Danas</h2>
            <Card>
              {news.length > 1 ? (
                news
                  .filter((item) => {
                    if (item.guid.includes("danas")) {
                      return item;
                    }return null
                  })
                  .filter((val) => {
                    if (search === "") {
                      return val;
                    } else if (
                      val.title.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return val;
                    }return null
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
          <Col style={{minWidth : "300px"}}>
            <h2>Mozzart</h2>
            <Card>
              {news.length > 1 ? (
                news
                  .filter((item) => {
                    if (item.guid.includes("mozzart")) {
                      return item;
                    }return null
                  })
                  .filter((val) => {
                    if (search === "") {
                      return val;
                    } else if (
                      val.title.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return val;
                    }return null
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
