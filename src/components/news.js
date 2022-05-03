import React from "react";
import "../App.css";
import { Modal, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function News(props) {
  const { REACT_APP_API_URL } = process.env;
  const [news, setNews] = useState([]);
  const getNews = async () => {
    fetch(REACT_APP_API_URL + "/getnews")
      .then((res) => res.json())
      .then((result) => setNews(result));
  };
  useEffect(() => {
    getNews();
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Vesti : </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {news
            ? news.map((vest) => {
                return (
                  <ListGroup.Item key={vest.title}>
                    {vest.title} <br></br>
                    <a href={`${vest.link}`}>Link</a>
                  </ListGroup.Item>
                );
              })
            : ""}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}
