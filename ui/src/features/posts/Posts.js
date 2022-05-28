import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, getPosts, editPost } from "./postsSlice";
import styles from "./Posts.module.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import ModalComponent from "../../components/Modal";
// import useModal from "../../hooks/useModal";

export function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const { data, status, error, editedPost } = posts;

  const [query, setQuery] = useState("");
  const [emptyMessage, setEmptyMessage] = useState("");

  // Quick fix to handle if returned data is empty
  const [isFirstLoad, setIsFirstLoad] = useState(false);

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInput = (event) => setQuery(event.target.value);

  const handleSubmit = () => {
    if (query === "") {
      setEmptyMessage("Type at least 2 characters");
      setTimeout(() => {
        setEmptyMessage("");
      }, 2000);
      return;
    } else {
      setEmptyMessage("");
      dispatch(getPosts(query));
      setIsFirstLoad(true);
      setTimeout(() => {
        setIsFirstLoad(false);
      }, 2000);
    }
  };

  // Quick way keyboard support
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
    const new_post = { ...editedPost };
    new_post[e.target.name] = e.target.value;
    dispatch(editPost(new_post));
  };

  // Quick way to organize some logic together
  const showResult = () => {
    if (data.length === 0 && isFirstLoad) {
      return (
        <h3>
          No results found for <strong> {query}</strong>! Try with different
          keyword!
        </h3>
      );
    }
    // If no input typed
    if (emptyMessage.length > 1) {
      return (
        <Alert key="danger" variant="danger">
          {emptyMessage}
        </Alert>
      );
    }
    // If result loading
    if (status === "loading") {
      return <h3>{status}</h3>;
    }
    // If api rejected data
    if (status === "rejected") {
      return (
        <Alert key="danger" variant="danger">
          {error}
        </Alert>
      );
    }
    // Success
    if (status === "idle" && data.length > 0 && emptyMessage.length === 0) {
      return data.map((post) => (
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
  };

  // Not ideal but works
  let result = showResult();

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
        <h4>
          Search Result: <span style={{ color: "gray" }}>{data.length}</span>
        </h4>
        <div className={styles.results}>{result}</div>
      </div>
      <ModalComponent
        hanldeModalChange={hanldeModalChange}
        handleClose={handleClose}
        show={show}
      />
    </div>
  );
}
