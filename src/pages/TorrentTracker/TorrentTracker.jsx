import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { useStateContext } from "../../components/StateContext";
import Torrent from "../../components/torrent";
import TorrentCategorySelector from "../../components/TorrentCategorySelector";
import "../../App.css";
const TorrentExplorer = () => {
  const { REACT_APP_API_URL } = process.env;
  const { torrentCategory, numberOfResults } = useStateContext();

  const [query, setQuery] = useState("");
  const [foundTorrents, setFoundTorrents] = useState([]);
  const [searching, setSearching] = useState(false);
  const handleSubmit = async () => {
    if (query) {
      fetch(
        REACT_APP_API_URL +
          "/torrentSearch/" +
          query +
          "/" +
          torrentCategory +
          "/" +
          numberOfResults
      )
        .then((res) => res.json())
        .then((result) => setFoundTorrents(result))
        .then(() => {
          setSearching(false);
        })
        .catch((e) => console.log("Database error  : " + e));
    }
  };

  return (
    <>
      <div
        style={{ height: "auto", paddingTop: "150px" }}
        className="d-flex flex-column  align-items-center torrent "
      >
        <Container
          style={{
            fontSize: "30px",
            color: "white",
            marginBottom: "30px",
            textAlign: "center",
          }}
          className="d-flex flex-column align-items-center"
        >
          <Col>TORRENT TRACKER</Col>
          <Col>Search through different online trackers on one location!</Col>
        </Container>
        <Form
          style={{ width: "90%", paddingLeft: "30px" }}
          className="d-flex  justify-content-center align-items-center flex-wrap"
          onSubmit={(e) => {
            setSearching(true);

            setFoundTorrents([]);
            e.preventDefault();

            handleSubmit();
          }}
        >
          {" "}
          <Form.Group>
            <InputGroup className="d-flex flex-nowrap">
              <input
                style={{ width: "40%" }}
                className="input-field"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <TorrentCategorySelector />
              <Button type="submit" variant="info" id="button-addon2">
                Search
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
        <Container className="d-flex flex-column justify-content-center align-items-center">
          {" "}
          {foundTorrents.length > 0 ? (
            <Torrent foundTorrents={foundTorrents} />
          ) : null}
          {searching ? (
            <Spinner
              animation="border"
              role="status"
              style={{ marginTop: "50px" }}
            ></Spinner>
          ) : null}
        </Container>
      </div>
    </>
  );
};

export default TorrentExplorer;
