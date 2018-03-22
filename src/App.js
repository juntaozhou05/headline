import React, { Component } from "react";
import "./App.css";

import Header from "./pages/Header";
import Lists from "./pages/Lists";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Lists />
      </div>
    );
  }
}

export default App;
