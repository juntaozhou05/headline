import React, { Component } from "react";

import "./detail.css";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      tags: []
    };
  }
  getData() {
    fetch("http://data.toutiaojk.com/extend/list/apparticle.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `id=${JSON.parse(this.props.match.params.data).id}&datafrom=news2`
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json.data);
        this.setState({
          data: json.data,
          tags: json.data.infotags.match(/[\u4e00-\u9fa5]+/g).slice(0, 4)
        });
      })
      .catch(error => console.log(error));
  }
  componentDidMount() {
    this.getData();
  }
  backfn() {
    window.history.go(-1);
  }
  render() {
    var query = JSON.parse(this.props.match.params.data);
    return (
      <div className="detail">
        <header className="top">
          <div className="topName">
            <span className="backicon" onClick={this.backfn}>
              ＜
            </span>
            <span>健康头条·头条</span>
          </div>
          <div className="title">{this.state.data.title}</div>
          <div className="inform">
            <span>{this.state.data.befrom}</span>
            <span className="time">{this.state.data.newstime}</span>
          </div>
        </header>
        <div className="content">
          <div dangerouslySetInnerHTML={{ __html: this.state.data.newstext }} />
        </div>
        <div className="bottom">
          {this.state.tags.map((item, index) => {
            return <span key={index}>{item}</span>;
          })}
          <div className="bottomTag">都翻到这儿了，下载个头条呗！</div>
        </div>
      </div>
    );
  }
}

export default Detail;
