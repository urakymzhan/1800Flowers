import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, getPosts, editPost, savePost } from "./postsSlice";
import styles from "./Posts.module.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const { data, status, error, editedPost } = posts;

  const [query, setQuery] = useState("");
  const [emptyMessage, setEmptyMessage] = useState("");

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInput = (event) => setQuery(event.target.value);

  const handleSubmit = (e) => {
    if (query === "") {
      setEmptyMessage("Type at least 2 characters");
      setTimeout(() => {
        setEmptyMessage("");
      }, 2000);
      // TODO: dispatch(getPosts(""));
      return;
    } else {
      setEmptyMessage("");
      dispatch(getPosts(query));
    }
  };

  // Keyboard support
  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      handleSubmit();
    }
  };

  // Modal Handlers
  const handleEdit = (postId) => {
    let postNeedsToBeEdited = data.filter((post) => post.id === postId)[0];
    dispatch(editPost(postNeedsToBeEdited));
  };

  const hanldeModalChange = (e) => {
    console.log(e.target.name, e.target.value);
    const new_post = { ...editedPost };
    new_post[e.target.name] = e.target.value;
    dispatch(editPost(new_post));
  };

  let result;
  // TODO
  // if (data.length === 0 && query.length > 0) {
  //   result = <h3>No results found! Try with different keywords!</h3>;
  // }
  if (emptyMessage.length > 1) {
    result = (
      <Alert key="danger" variant="danger">
        {emptyMessage}
      </Alert>
    );
  }
  if (status === "loading") {
    result = <h3>{status}</h3>;
  }
  if (status === "rejected") {
    result = (
      <Alert key="danger" variant="danger">
        {error}
      </Alert>
    );
  }
  if (status === "idle" && data.length > 0) {
    result = data.map((post) => (
      <p key={post.id}>
        <Button
          variant="link"
          onClick={() => {
            handleShow();
            handleEdit(post.id);
          }}
        >
          {" "}
          {post.title}
        </Button>
      </p>
    ));
  }

  return (
    <div className={styles.posts}>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          type="text"
          placeholder="Search for posts. Ex: sunt"
          onChange={handleInput}
          onKeyPress={handleKeyPress}
        />
        <button className={styles.button} onClick={handleSubmit} tabIndex="0">
          SEARCH
        </button>
      </div>
      <div className={styles.row}>
        <h2>Search Result: {data.length}</h2>
        <div className={styles.results}>{result}</div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* id - user shouldn't change it */}
            <Form.Group className="mb-3">
              <Form.Label>Post Id</Form.Label>
              <Form.Control type="text" value={editedPost.id} disabled />
            </Form.Group>

            {/* title */}
            <Form.Group className="mb-3">
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                type="text"
                autoFocus={true}
                value={editedPost.title}
                name="title"
                onChange={hanldeModalChange}
              />
            </Form.Group>
            {/* body */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Post Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={editedPost.body}
                name="body"
                onChange={hanldeModalChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        {/* footer menu */}
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={() => {
              handleClose();
              dispatch(savePost());
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
