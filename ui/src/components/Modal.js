import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { selectPosts, savePost } from "../features/posts/postsSlice";
import { useSelector, useDispatch } from "react-redux";
// import useModal from "../hooks/useModal";

export default function ModalComponent({
  show,
  handleClose,
  hanldeModalChange,
}) {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const { editedPost } = posts;

  return (
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
  );
}
