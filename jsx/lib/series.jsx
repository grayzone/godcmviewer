import React from "react";
import { Row, Col, Card } from "antd";
import $ from "jquery";
import URL from "url";

class SeriesCard extends React.Component {
  handleSeriesClick = e => {
    console.log("click series :", this.props.StudyInstanceUID);
    window.location.href = "/series/" + this.props.data.ID;
  };

  render() {
    return (
      <Card onClick={this.handleSeriesClick}>
        <Row>
          <Col>
            Series Number:{this.props.data.SeriesNumber}
          </Col>
          <Col>
            Modality:{this.props.data.Modality}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default class SeriesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }
  getSeriesList = studyuid => {
    var url = "/serieslist";
    $.ajax({
      url: url,
      dataType: "json",
      type: "POST",
      cache: false,
      async: false,
      data: {
        studyuid: studyuid
      },
      success: data => {
        console.log("get the series list.", data);
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

    var studyuid = p.path.substr(7);
    //    console.log(studyuid);

    this.getSeriesList(studyuid);
  }

  render() {
    const seriesList = [];
    for (let i = 0; i < this.state.list.length; i++) {
      let data = this.state.list[i];
      var s = (
        <Col span={4}>
          <SeriesCard data={data} />
        </Col>
      );

      seriesList.push(s);
    }

    return (
      <Row>
        {seriesList}
      </Row>
    );
  }
}
