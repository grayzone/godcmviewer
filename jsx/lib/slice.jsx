import React from "react";
import { Row, Col, Card } from "antd";
import $ from "jquery";
import URL from "url";

class SliceCard extends React.Component {
  handleSliceClick = e => {
    console.log("click slice :", this.props.SeriesInstanceUID);
    window.location.href = "/slice/" + this.props.data.ID;
  };

  render() {
    return (
      <Card onClick={this.handleSliceClick}>
        <Row>
          <Col>
            Instance Number:{this.props.data.InstanceNumber}
          </Col>
          <Col>
            Columns:{this.props.data.Columns}
          </Col>
          <Col>
            Rows:{this.props.data.Rows}
          </Col>
          <Col>
            Content Date:{this.props.data.ContentDate}
          </Col>
          <Col>
            Content Time:{this.props.data.ContentTime}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default class SliceList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }
  getSliceList = seriesuid => {
    var url = "/slicelist";
    $.ajax({
      url: url,
      dataType: "json",
      type: "POST",
      cache: false,
      async: false,
      data: {
        seriesuid: seriesuid
      },
      success: data => {
        console.log("get the slice list.", data);
        this.setState({
          list: data
        });
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString());
      }
    });
  };
  componentWillMount() {
    //    console.log(window.location.href);
    var p = URL.parse(window.location.href, true);

    var seriesuid = p.path.substr(8);
    //    console.log(studyuid);

    this.getSliceList(seriesuid);
  }

  render() {
    const sliceList = [];
    for (let i = 0; i < this.state.list.length; i++) {
      let data = this.state.list[i];
      var s = (
        <Col span={4}>
          <SliceCard data={data} />
        </Col>
      );

      sliceList.push(s);
    }

    return (
      <Row>
        {sliceList}
      </Row>
    );
  }
}
