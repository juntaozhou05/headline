import React, { Component } from "react";

import Tabs from "../../components/Tabs";

import "./header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="header">
        <div className="title">头条信息</div>
        <Tabs />
      </div>
    );
  }
}

export default Header;
