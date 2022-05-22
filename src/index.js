import React from "react";
import ReactDOM from "react-dom";
import Content from "./components/content";

import "./styles.css";
function App() {
  return (
    <div className="App">
      <div className="wizard">
        <Content />
        <div style={{ color: "white", fontSize: 8, opacity: 0.8 }}>
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/smalllikeart"
            title="smalllikeart"
          >
            smalllikeart
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>{" "}
          is licensed by{" "}
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
          >
            CC 3.0 BY
          </a>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
