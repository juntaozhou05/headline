import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Tabs, WhiteSpace } from "antd-mobile";

import "./lists.css";

import ListViewDemo from "../../components/ListViewDemo";

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classid: 1
    };
  }
  renderContent = tab => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "150px",
        backgroundColor: "#fff"
      }}
    >
      <p>Content of {tab.title}</p>
    </div>
  );

  changeTab(e) {
    console.log(e);
    this.setState({
      classid: e.classid
    });
  }

  render() {
    const tabs = [
      { title: "推荐", classid: 1 },
      { title: "头条", classid: 2 },
      { title: "女性", classid: 3 },
      { title: "育儿", classid: 4 },
      { title: "中医", classid: 5 },
      { title: "本地", classid: 6 },
      { title: "政策", classid: 7 },
      { title: "产业", classid: 8 },
      { title: "旅游", classid: 9 }
    ];

    return (
      <div style={{ height: "100%" }}>
        <div className="header">头条新闻</div>
        <WhiteSpace />
        <Tabs
          tabs={tabs}
          swipeable={false}
          onChange={e => this.changeTab(e)}
          renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
        >
          <ListViewDemo classid={this.state.classid} />
        </Tabs>
        <WhiteSpace />
      </div>
    );
  }
}
export default Demo;
