import React from "react";
import ReactDOM from "react-dom";
import GoDCMMenu from "./lib/menu";
import GoDcmAdmin from "./lib/admin";
import PatientList from "./lib/list";


var menuDIV = document.getElementById("godcmMenu");
if (menuDIV != null) {
  ReactDOM.render(<GoDCMMenu />, menuDIV);
}

var patientListDIV = document.getElementById("patientlist");
if (patientListDIV != null) {
  ReactDOM.render(<PatientList />, patientListDIV);
}


var adminDIV = document.getElementById("admin");
if (adminDIV != null) {
  ReactDOM.render(<GoDcmAdmin />, adminDIV);
}
