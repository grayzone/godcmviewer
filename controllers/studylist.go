package controllers

import (
	"github.com/astaxie/beego"
	"github.com/grayzone/godcmviewer/models"
)

type StudyListController struct {
	beego.Controller
}

/*
func (c *StudyController) Get() {
	c.TplName = "study.html"
	c.Layout = "layout.html"
}
*/
func (c *StudyListController) GetStudyList() {
	patientuid := c.GetString("patientuid")
	beego.Info("patient uid:", patientuid)
	result := models.GetStudies(patientuid)
	c.Data["json"] = &result
	c.ServeJSON()

}
