import React, { Component } from "react";
import "./App.css";

import { Button } from "antd-mobile";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <Button>111</Button>
        </p>
      </div>
    );
  }
}

export default App;
