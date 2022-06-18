import React from "react";
import { Table } from "react-bootstrap";

const Torrent = ({ foundTorrents }) => {
  console.log(foundTorrents);
  return (
    <div style={{ marginTop: "20px" }}>
      <Table striped bordered hover style={{background : "white"}}>
        <thead>
          <tr>
            <th>File name</th>
            <th>Size</th>
            <th>seeders</th>
            <th>tracker</th>

          </tr>
        </thead>
        <tbody>
          
            {foundTorrents.length !== 0 ? (
              foundTorrents.map((torrent) => (
                <tr>
                  <td>
                    <a
                      rel="noreferrer noopener"
                      target="_blank"
                      href={torrent.desc}
                    >
                      {torrent.title}
                    </a>
                  </td>
                  <td>{torrent.size}</td>
                  <td> {torrent.seeds}</td>
                  <td> {torrent.provider}</td>

                </tr>
              ))
            ) : (
              <h1>No torrents found</h1>
            )}
          
        </tbody>
      </Table>
    </div>
  );
};

export default Torrent;
