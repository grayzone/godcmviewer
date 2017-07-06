import React from "react";
import $ from "jquery";
import PatientCard from "./patient";
import { Row, Col } from "antd";

export default class PatientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientList: []
    };
  }

  getPatientList = () => {
    var url = "/patientlist";
    $.ajax({
      url: url,
      dataType: "json",
      type: "GET",
      cache: false,
      async: false,
      success: data => {
        console.log("get the patient list.", data);
        this.setState({
          patientList: data
        });
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString());
      }
    });
  };

  componentWillMount() {
    this.getPatientList();
  }

  render() {
    var list = [];
    var pl = this.state.patientList;
    for (let i = 0; i < pl.length; i++) {
      var data = {
        PatientName: pl[i].PatientName,
        PatientID: pl[i].PatientID,
        PatientBirthDate: pl[i].PatientBirthDate,
        ID: pl[i].ID
      };
      var p = (
        <Col span={4}>
          <PatientCard data={data} />
        </Col>
      );
      list.push(p);
    }
    return (
      <Row gutter={8}>
        {list}
      </Row>
    );
  }
}
