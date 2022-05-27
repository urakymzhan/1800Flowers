import React from "react";
import { Posts } from "./features/posts/Posts";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Posts />
    </div>
  );
}

export default App;
