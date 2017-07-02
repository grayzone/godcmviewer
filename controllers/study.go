package controllers

import (
	"github.com/astaxie/beego"
	"github.com/grayzone/godcmviewer/models"
)

type StudyController struct {
	beego.Controller
}

func (c *StudyController) Get() {
	c.TplName = "study.html"
	c.Layout = "layout.html"
}

func (c *StudyController) GetStudyList() {
	patientuid := c.GetString("patientuid")
	beego.Info("patient uid:", patientuid)
	result := models.GetStudies(patientuid)
	c.Data["json"] = &result
	c.ServeJSON()

}
