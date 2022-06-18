import React from "react";
import { Dropdown } from "react-bootstrap";
import { useStateContext } from "./StateContext";

const TorrentCategorySelector = () => {
  const { torrentCategory, setTorrentCategory } = useStateContext();
  const handleCategoryChange = (category) => {
    setTorrentCategory(category);
  };
  return (
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
  );
};

export default TorrentCategorySelector;
