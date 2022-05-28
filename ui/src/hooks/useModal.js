import { useState } from "react";

// TODO: this can be extended
const useModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return [show, handleShow, handleClose];
};

export default useModal;
