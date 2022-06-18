import React, { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useStateContext } from "../components/StateContext";
import Torrent from "../components/torrent";
import TorrentCategorySelector from "../components/TorrentCategorySelector";

const TorrentExplorer = () => {
  const { setSearchBar, torrentCategory } = useStateContext();
  setSearchBar(false);
  const [query, setQuery] = useState("");
  const [foundTorrents, setFoundTorrents] = useState([]);
  const handleSubmit = async () => {
    if (query) {
      fetch(
        "http://localhost:3001/torrentSearch/" + query + "/" + torrentCategory
      )
        .then((res) => res.json())
        .then((result) => setFoundTorrents(result))
        .catch((e) => console.log("Database error  : " + e));
    }
  };

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
          onSubmit={(e) => {
            e.preventDefault();

            handleSubmit();
          }}
        >
          {" "}
          <Form.Group>
            <InputGroup >
              <input
              style={{width : "500px"}}
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
        {foundTorrents.length > 0 ?  <Torrent foundTorrents={foundTorrents} /> : (
            <h1 style={{marginTop : "20px",color : "white"}}>Please enter search terms !</h1>
            )}
        
  
      </div>
    </>
  );
};

export default TorrentExplorer;
