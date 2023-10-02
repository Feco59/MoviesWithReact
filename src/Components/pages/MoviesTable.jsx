import { useMemo, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Movie from "../modals/Movie";

const MoviesTable = ({ moviesList }) => {
  const [search, setSearch] = useState("");

  const rows = moviesList;
  const filteredRows = useMemo(() => {
    if (!search) {
      return rows;
    }

    if (rows.length > 0) {
      const list = [];
      for (const current of rows) {
        if (Number(current.PEGI) === Number(search)) {
          list.push(current);
        }
      }
      return list;
    }
    return [];
  }, [search, rows]);

  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{color:"white"}}>PEGI filter</Form.Label>
        <Form.Control
          type="email"
          placeholder="Filter"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form.Group>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr></tr>
          <tr>
            <th>Title</th>
            <th>PEGI</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((e) => (
            <tr key={e._id}>
              <td>{e.title}</td>
              <td>{e.PEGI}</td>
              <td>
                <Movie movieData={e} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default MoviesTable;
