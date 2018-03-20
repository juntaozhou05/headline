import React, { Component } from "react";

import { Tabs, WhiteSpace } from "antd-mobile";
import ItemList from "../ItemList";
import config from "../../config";

import "./tabs.css";

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classid: 0,
      page: 1,
      lists: []
    };
  }

  componentDidMount = () => {
    this.getData(this.state.classid, this.state.page);
  };

  getData(classid, page) {
    fetch(`${config.api}extend/list/appclass.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `classid=${classid}&page=${page}`
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          lists: res
        })
      )
      .catch(error => console.log(error));
  }

  change(key) {
    console.log(key);
    this.getData(key.classid, 1);
  }

  renderContent = tab => (
    <div className="tabs">
      <ItemList lists={this.state.lists} />
    </div>
  );

  render() {
    const tabs = [
      { title: "头条", classid: 0 },
      { title: "女性", classid: 1 },
      { title: "育儿", classid: 2 },
      { title: "中医", classid: 3 },
      { title: "本地", classid: 4 },
      { title: "政策", classid: 5 },
      { title: "产业", classid: 6 },
      { title: "旅游", classid: 7 }
    ];

    return (
      <div>
        <WhiteSpace />
        <Tabs
          distanceToChangeTab={0.8}
          onChange={key => {
            this.change(key);
          }}
          tabs={tabs}
          renderTabBar={props => (
            <Tabs.DefaultTabBar {...props} page={5} onChange={this.tabChange} />
          )}
        >
          {this.renderContent}
        </Tabs>
        <WhiteSpace />
      </div>
    );
  }
}

export default Demo;
