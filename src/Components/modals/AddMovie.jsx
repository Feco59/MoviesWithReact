import { useContext, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { PEGICategories } from "../common/PEGICategories";
import apiService from "../../services/apiService";
import { MoviesContext } from "../common/MoviesContext";

const AddMovie = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const { movies, setMovies } = useContext(MoviesContext);

  const initailState = {title: '', description: '', PEGI:0}

  const [{ title, description, PEGI }, setState] = useState(initailState);

  const handleClose = () => {
    setState(initailState)
    setShow(false)
  };
  const handleShow = () => setShow(true);
  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
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
      const movie = { title, description, PEGI };
      await apiService.POST("/", { title, description, PEGI });
      setState(initailState)
      setMovies([...movies, movie]);
      handleClose();
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Movie
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <h3>Add movie</h3>
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
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="MoviePEGI">
              <Form.Label>PEGI</Form.Label>
              <Form.Select name="PEGI" onChange={onChange}>
                <option value={0}>Please select PEGI category</option>
                {PEGICategories.map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="buttons" controlId="Buttons">
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddMovie;