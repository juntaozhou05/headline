import React, { Component } from "react";

import "./detail.css";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
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
          data: json.data
        });
      })
      .catch(error => console.log(error));
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    var query = JSON.parse(this.props.match.params.data);
    return (
      <div className="detail">
        <header className="top">
          <div className="topName">
            <span>健康头条·头条</span>
          </div>
          <div className="title">{this.state.data.title}</div>
          <div className="inform">
            <span>{this.state.data.befrom}</span>
            <span className="time">{this.state.data.newstime}</span>
          </div>
        </header>
      </div>
    );
  }
}

export default Detail;
