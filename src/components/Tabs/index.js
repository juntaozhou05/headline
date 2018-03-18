import React, { Component } from "react";

import { Tabs, WhiteSpace } from "antd-mobile";

class Demo extends React.Component {
  renderContent = tab => (
    <div
      style={{
        display: "flex",
        height: "700px",
        backgroundColor: "#fff",
        wordBreak: "break-all",
        padding: "10px"
      }}
    >
      <p>
        Content 111111111111111111111111111111111111111111111111111of{" "}
        {tab.title}
      </p>
    </div>
  );
  change(key) {
    console.log(key);
  }
  render() {
    const tabs = [
      { title: "头条", class: 0 },
      { title: "女性", class: 1 },
      { title: "育儿", class: 2 },
      { title: "中医", class: 3 },
      { title: "本地", class: 4 },
      { title: "政策", class: 5 },
      { title: "产业", class: 6 },
      { title: "旅游", class: 7 }
    ];

    return (
      <div>
        <WhiteSpace />
        <Tabs
          onTabClick={key => {
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
