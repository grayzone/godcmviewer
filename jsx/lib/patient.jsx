import React from "react";
import { Card, Row, Col } from "antd";
import StudyList from "./studylist";

export default class PatientCard extends React.Component {
  constructor(props) {
    super(props);
    /*
    this.state = {
      PatientName: "",
      PatientID: "",
      PatientBirthDate: "",
      ID:""
    };
    */
  }


  render() {
    return (
      <Card title={this.props.data.PatientName} >
        <Row>
          <Col>
            Patient ID: {this.props.data.PatientID}
          </Col>
          <Col>
            Patient Birth: {this.props.data.PatientBirthDate}
          </Col>
          <Col>
            <StudyList patientuid={this.props.data.ID} />
          </Col>
        </Row>
      </Card>
    );
  }
}
