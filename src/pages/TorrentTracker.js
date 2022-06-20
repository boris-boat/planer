import React, { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import { useStateContext } from "../components/StateContext";
import Torrent from "../components/torrent";
import TorrentCategorySelector from "../components/TorrentCategorySelector";

const TorrentExplorer = () => {
  const { REACT_APP_API_URL } = process.env;
  const { setSearchBar, torrentCategory, numberOfResults } = useStateContext();

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
  useEffect(() => {
    setSearchBar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        style={{ marginTop: "200px" }}
        className="d-flex flex-column justify-content-center align-items-center flex-wrap"
      >
        <Container
          style={{ fontSize: "30px", color: "white", marginBottom: "30px" }}
          className="d-flex flex-column justify-content-center align-items-center flex-wrap"
        >
          TORRENT TRACKER
        </Container>
        <Form
          style={{ width: "60%" }}
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
            <InputGroup>
              <input
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
        <Container className="d-flex flex-column justify-content-center align-items-center" >
          {" "}
          {foundTorrents.length > 0 ? (
            <Torrent foundTorrents={foundTorrents}  style={{maxWidt : "60%"}}/>
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
