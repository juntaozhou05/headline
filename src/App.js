import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";

import { ActivityIndicator } from "antd-mobile";

import Header from "./pages/Header";
import Lists from "./pages/Lists";
import Detail from "./pages/Detail";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ActivityIndicator toast text="正在加载" animating={false} />
        <Route exact path="/" component={Lists} />
        <Route path="/detail/:data" component={Detail} />
      </div>
    );
  }
}

export default App;
