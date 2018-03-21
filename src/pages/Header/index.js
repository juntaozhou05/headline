import React, { Component } from "react";

import PullTo from "../../components/PullTo";

import "./header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="header">
        <div className="title">头条新闻</div>
        <PullTo />
      </div>
    );
  }
}

export default Header;
