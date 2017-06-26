import React from "react";
import { Card, Row, Col } from "antd";

export default class PatientCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PatientName: "",
      PatientID: "",
      PatientBirthDate: ""
    };
  }

  handleClick = e => {
    console.log("click card:", this.props.data.PatientName);
  };
  render() {
    return (
      <Card title={this.props.data.PatientName} onClick={this.handleClick}>
        <Row>
          <Col>Patient ID: {this.props.data.PatientID}</Col>
          <Col>Patient Birth: {this.props.data.PatientBirthDate}</Col>
        </Row>

      </Card>
    );
  }
}
