import React from "react";
import { Dropdown } from "react-bootstrap";
import { useStateContext } from "./StateContext";

const TorrentCategorySelector = () => {
  const {
    torrentCategory,
    setTorrentCategory,
    numberOfResults,
    setNumberOfResults,
  } = useStateContext();
  const handleCategoryChange = (category) => {
    setTorrentCategory(category);
  };
  const handleNumberOfResultsChange = (number) => {
    setNumberOfResults(number);
  };
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {torrentCategory}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={(e) => handleCategoryChange(e.target.innerText)}
          >
            All
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleCategoryChange(e.target.innerText)}
          >
            Movies
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleCategoryChange(e.target.innerText)}
          >
            TV
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleCategoryChange(e.target.innerText)}
          >
            Apps
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleCategoryChange(e.target.innerText)}
          >
            Books
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleCategoryChange(e.target.innerText)}
          >
            Games
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleCategoryChange(e.target.innerText)}
          >
            Music
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {numberOfResults}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={(e) => handleNumberOfResultsChange(e.target.innerText)}
          >
            10
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleNumberOfResultsChange(e.target.innerText)}
          >
            20
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleNumberOfResultsChange(e.target.innerText)}
          >
            50
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleNumberOfResultsChange(e.target.innerText)}
          >
            100
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default TorrentCategorySelector;
