import React, { Component } from "react";
import { PullToRefresh, Button } from "antd-mobile";

import Tabs from "../../components/Tabs";

function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight,
      data: []
    };
  }

  componentDidMount() {
    //const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(
      () =>
        this.setState({
          height: "1000px",
          data: genData()
        }),
      0
    );
  }

  render() {
    return (
      <div>
        <PullToRefresh
          ref={el => (this.ptr = el)}
          style={{
            height: this.state.height,
            overflow: "auto"
          }}
          indicator={this.state.down ? {} : { deactivate: "上拉可以刷新" }}
          direction={this.state.down ? "down" : "up"}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.setState({ refreshing: true });
            setTimeout(() => {
              this.setState({ refreshing: false });
            }, 1000);
          }}
        >
          <Tabs />
        </PullToRefresh>
      </div>
    );
  }
}

export default Demo;
