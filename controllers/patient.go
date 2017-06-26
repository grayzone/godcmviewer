package controllers

import (
	"github.com/astaxie/beego"
	"github.com/grayzone/godcmviewer/models"
)

type PatientController struct {
	beego.Controller
}

func (c *PatientController) GetPatientList() {
	pl := models.GetPatients()
	c.Data["json"] = &pl
	c.ServeJSON()
}
