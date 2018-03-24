import React, { Component } from "react";

import "./itemlist.css";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    //一张图情况
    return (
      <div className="itemlist">
        <div className="content">
          {this.props.lists.map((item, index) => {
            //三张图情况
            if (item.titlepic3) {
              return (
                <div className="items" key={index}>
                  <div className="titles">{item.title}</div>
                  <div className="imgs">
                    <img src={item.titlepic} alt="" />
                    <img src={item.titlepic2} alt="" />
                    <img src={item.titlepic3} alt="" />
                  </div>
                  <div className="bottom">
                    {item.befrom} {item.onclick}阅读
                  </div>
                </div>
              );
              //一张大图
            } else if (item.ptitlepic) {
              return (
                <div className="itemsBig" key={index}>
                  <div className="titles">{item.title}</div>
                  <div className="imgsOneBig">
                    <img src={item.ptitlepic} alt="" />
                  </div>
                  <div className="bottom">
                    {item.befrom} {item.onclick}阅读
                  </div>
                </div>
              );
              //一张小图
            } else {
              return (
                <div className="itemsOne" key={index}>
                  <div className="titles">
                    {item.title}
                    <div className="bottom">
                      {item.befrom} {item.onclick}阅读
                    </div>
                  </div>
                  <div className="imgs">
                    <img src={item.titlepic} alt="" />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default ItemList;
