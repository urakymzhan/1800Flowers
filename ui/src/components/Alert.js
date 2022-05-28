import React from "react";
import Alert from "react-bootstrap/Alert";

export default function AlertComponent({ children, props }) {
  return <Alert {...props}>{children}</Alert>;
}
