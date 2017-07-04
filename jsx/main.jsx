import React from "react";
import ReactDOM from "react-dom";
import GoDCMMenu from "./lib/menu";
import GoDcmAdmin from "./lib/admin";
import PatientList from "./lib/list";
import UploadDcm from "./lib/upload";
import StudyList from "./lib/study";
import SeriesList from "./lib/series";
import SliceList from "./lib/slice";

var menuDIV = document.getElementById("godcmMenu");
if (menuDIV != null) {
  ReactDOM.render(<GoDCMMenu />, menuDIV);
}

var uploadDcmDIV = document.getElementById("upload");
if (uploadDcmDIV != null) {
  ReactDOM.render(<UploadDcm />, uploadDcmDIV);
}

var adminDIV = document.getElementById("admin");
if (adminDIV != null) {
  ReactDOM.render(<GoDcmAdmin />, adminDIV);
}

var patientListDIV = document.getElementById("patientlist");
if (patientListDIV != null) {
  ReactDOM.render(<PatientList />, patientListDIV);
}
var studyListDIV = document.getElementById("studylist");
if (studyListDIV != null) {
  ReactDOM.render(<StudyList />, studyListDIV);
}

var seriesListDIV = document.getElementById("serieslist");
if (seriesListDIV != null) {
  ReactDOM.render(<SeriesList />, seriesListDIV);
}

var sliceListDIV = document.getElementById("slicelist");
if (sliceListDIV != null) {
  ReactDOM.render(<SliceList />, sliceListDIV);
}