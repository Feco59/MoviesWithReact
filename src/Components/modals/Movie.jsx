import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import apiService from "../../services/apiService";
import { MoviesContext } from "../common/MoviesContext";
import { Form } from "react-bootstrap";
import { PEGICategories } from "../common/PEGICategories";

const Movie = ({ movieData }) => {
  const initailState = movieData;
  const [{ title, description, PEGI, _id }, setState] = useState(initailState);
  const { movies, setMovies } = useContext(MoviesContext);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = () => setEdit(!edit);

  const deleteMovie = async () => {
    await apiService.DELETE(`/${_id}`);
    setMovies(movies.filter((e) => e._id !== _id));
    handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (title.length < 1) {
      setError(true);
      alert("Please provide the title");
      return;
    }
    if (description.length < 1) {
      setError(true);
      alert("Please provide the description");
      return;
    }

    if (description.length > 200) {
      setError(true);
      alert("The description is to long");
      return;
    }

    if (Number(PEGI) === 0) {
      setError(true);
      alert("Please select the PEGI rating");
      return;
    }

    if (!error) {
      const ChangedMovie = { _id, title, description, PEGI };
      
      const UnchangedMoviesList = movies.filter((e) => e._id!== _id);
      
      await apiService.PUT(`/${_id}`, { title, description, PEGI });
      setMovies([...UnchangedMoviesList, ChangedMovie]);
      handleClose();
      setError(false)
    }
  };

  const handleCancelEdit = () => {
    setState(initailState);
    handleEdit();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Button variant="outline-info" onClick={handleShow}>
        Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="MovieTitle">
              <Form.Label>Movie Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={onChange}
                autoFocus
                disabled={!edit}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="MovieDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={description}
                onChange={onChange}
                disabled={!edit}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="MoviePEGI">
              <Form.Label>PEGI</Form.Label>
              <Form.Select
                name="PEGI"
                onChange={onChange}
                value={PEGI}
                disabled={!edit}
              >
                <option value={0}>Please select PEGI category</option>
                {PEGICategories.map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {edit ? (
              <div className="buttons">
                <Button onClick={handleSubmit} variant="success">
                  Save
                </Button>
                <Button onClick={handleCancelEdit} variant="warning">
                  Cancel
                </Button>
              </div>
            ) : null}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {!edit && <Button onClick={handleEdit}>Edit</Button>}
          <Button onClick={async () => await deleteMovie()} variant="danger">
            Delete
          </Button>
          <Button onClick={handleClose} variant="info">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Movie;
