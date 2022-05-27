import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

test("make sure main app element is in the component", () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const mainAppWrapper = container.getElementsByClassName("App");
  expect(mainAppWrapper.length).toBe(1);
});
