import React, { Component } from "react";
import ReactDOM from "react-dom";
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { ListView } from "antd-mobile";

import "./listviewdemo.css";

function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: "none" }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

let data = [];
let index = data.length - 1;

const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;
let pageNumber = 1;

class Demo extends React.Component {
  static async getInitialProps() {
    // Toast.loading('加载中...', 5, () => {});
    // const res = await server.cnodeList(1, 'all')
    // const ooo = res.data
    // Toast.hide()
    // return {
    //     shows: res
    // }
  }
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    this.dataBlob = {};
    this.sectionIDs = [];
    this.rowIDs = [];
    this.genData = (pIndex = 0) => {
      for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = pIndex * NUM_SECTIONS + i;
        const sectionName = `Section ${ii}`;
        this.sectionIDs.push(sectionName);
        this.dataBlob[sectionName] = sectionName;
        this.rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
          const rowName = `S${ii}, R${jj}`;
          this.rowIDs[ii].push(rowName);
          this.dataBlob[rowName] = rowName;
        }
      }
      // new object ref
      this.sectionIDs = [].concat(this.sectionIDs);
      this.rowIDs = [].concat(this.rowIDs);
    };

    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(
        this.dataBlob,
        this.sectionIDs,
        this.rowIDs
      ),
      isLoading: true,
      height: 0
    };
  }

  getData(page) {
    fetch("http://data.toutiaojk.com/extend/list/appclass.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `classid=1&page=${page}`
    })
      .then(res => res.json())
      .then(json => {
        data = [...json];
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(
            this.dataBlob,
            this.sectionIDs,
            this.rowIDs
          ),
          isLoading: false
        });
        console.log("data", data);
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    // simulate initial Ajax
    this.genData();
    this.getData(pageNumber);
  }

  onEndReached = event => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log("reach end", event);
    this.setState({ isLoading: true });
    this.genData(++pageIndex);
    this.getData(++pageNumber);
  };

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: "#F5F5F9",
          height: 8,
          borderTop: "1px solid #ECECED",
          borderBottom: "1px solid #ECECED"
        }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      if (obj.titlepic3) {
        return (
          <div key={rowID} className="content">
            <div className="items" key={index}>
              <div className="titles">{obj.title}</div>
              <div className="imgs">
                <img src={obj.titlepic} alt="" />
                <img src={obj.titlepic2} alt="" />
                <img src={obj.titlepic3} alt="" />
              </div>
              <div className="bottom">
                {obj.befrom} {obj.onclick}阅读
              </div>
            </div>
          </div>
        );
      } else if (obj.ptitlepic) {
        return (
          <div key={rowID} className="content">
            <div className="itemsBig" key={index}>
              <div className="titles">{obj.title}</div>
              <div className="imgsOneBig">
                <img src={obj.ptitlepic} alt="" />
              </div>
              <div className="bottom">
                {obj.befrom} {obj.onclick}阅读
              </div>
            </div>
          </div>
        );
        //一张小图
      } else {
        return (
          <div key={rowID} className="content">
            <div className="itemsOne" key={index}>
              <div className="titles">
                {obj.title}
                <div className="bottom">
                  {obj.befrom} {obj.onclick}阅读
                </div>
              </div>
              <div className="imgs">
                <img src={obj.titlepic} alt="" />
              </div>
            </div>
          </div>
        );
      }
    };

    return (
      <div style={{ margin: "0 auto", width: "96%", height: "100%" }}>
        <ListView
          ref="lv"
          dataSource={this.state.dataSource}
          renderHeader={() => <span>header</span>}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: "center" }}>
              {this.state.isLoading ? "Loading..." : "Loaded"}
            </div>
          )}
          renderSectionHeader={sectionData => (
            <div>{`Task ${sectionData.split(" ")[1]}`}</div>
          )}
          // renderBodyComponent={() => <MyBody />}
          renderRow={row}
          renderSeparator={separator}
          className="fortest"
          style={{
            height: "100%",
            overflow: "auto",
            border: "1px solid #ddd",
            margin: "0.1rem 0"
          }}
          pageSize={4}
          onScroll={() => {
            console.log("scroll");
          }}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={200}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}
export default Demo;
