import React from "react";
import ReactDOM from "react-dom";
import GoDCMMenu from "./lib/menu";
import GoDcmAdmin from "./lib/admin";
import PatientList from "./lib/list";
import UploadDcm from "./lib/upload";

var menuDIV = document.getElementById("godcmMenu");
if (menuDIV != null) {
  ReactDOM.render(<GoDCMMenu />, menuDIV);
}

var patientListDIV = document.getElementById("patientlist");
if (patientListDIV != null) {
  ReactDOM.render(<PatientList />, patientListDIV);
}

var uploadDcmDIV = document.getElementById("upload");
if (uploadDcmDIV != null) {
  ReactDOM.render(<UploadDcm />, uploadDcmDIV);
}

var adminDIV = document.getElementById("admin");
if (adminDIV != null) {
  ReactDOM.render(<GoDcmAdmin />, adminDIV);
}
