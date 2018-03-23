import React, { Component } from "react";
import ReactDOM from "react-dom";
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { ListView } from "antd-mobile";

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
        data = json;
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(
            this.dataBlob,
            this.sectionIDs,
            this.rowIDs
          ),
          isLoading: false
        });
        console.log(this.state.data);
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
      return (
        <div key={rowID} className="row">
          <div className="row-title">{obj.title}</div>
          <div
            style={{
              display: "-webkit-box",
              display: "flex",
              padding: "0.3rem 0"
            }}
          >
            <img
              style={{ height: "1.28rem", marginRight: "0.3rem" }}
              src={obj.titlepic}
              alt="icon"
            />
            <div className="row-text">
              <div style={{ marginBottom: "0.16rem", fontWeight: "bold" }}>
                {obj.des}
              </div>
              <div>
                <span style={{ fontSize: "0.6rem", color: "#FF6E27" }}>35</span>¥
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div style={{ margin: "0 auto", width: "96%" }}>
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
            height: "500px",
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
