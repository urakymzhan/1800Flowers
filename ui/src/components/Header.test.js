import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";

test("renders Posts.com heading", () => {
  const { getByText } = render(<Header />);
  expect(getByText(/Posts/i)).toBeInTheDocument();
});

test("renders Card heading", () => {
  const { getByText } = render(<Header />);

  expect(getByText(/Cart/i)).toBeInTheDocument();
});
