import React from "react";
import { Row, Col, Card } from "antd";
import $ from "jquery";

class StudyCard extends React.Component {
  handleStudyClick = e => {
    console.log("click study :", this.props.PatientName);
    window.location.href = "/study/" + this.props.data.ID;
  };

  render() {
    return (
      <Card onClick={this.handleStudyClick}>
        <Row>
          <Col>
            Study Date: {this.props.data.StudyDate}
          </Col>
          <Col>
            Study ID: {this.props.data.StudyID}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default class StudyList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }
  getStudyList = () => {
    var url = "/studylist";
    $.ajax({
      url: url,
      dataType: "json",
      type: "POST",
      cache: false,
      async: false,
      data: {
        patientuid: this.props.patientuid
      },
      success: data => {
        console.log("get the study list.", data);
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
    this.getStudyList();
  }

  render() {
    const studyList = [];
    for (let i = 0; i < this.state.list.length; i++) {
      let data = this.state.list[i];
      var s = <StudyCard data={data} />;

      studyList.push(s);
    }

    return (
      <div>
        {studyList}
      </div>
    );
  }
}
