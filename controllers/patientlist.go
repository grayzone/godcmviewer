package controllers

import (
	"github.com/astaxie/beego"
	"github.com/grayzone/godcmviewer/models"
)

type PatientListController struct {
	beego.Controller
}

func (c *PatientListController) Get() {
	c.TplName = "patientlist.html"
	c.Layout = "layout.html"
}

func (c *PatientListController) GetPatientList() {
	pl := models.GetPatients()
	c.Data["json"] = &pl
	c.ServeJSON()
}
