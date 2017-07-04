package controllers

import (
	"github.com/astaxie/beego"
	"github.com/grayzone/godcmviewer/models"
)

type SeriesController struct {
	beego.Controller
}

func (c *SeriesController) Get() {
	c.TplName = "series.html"
	c.Layout = "layout.html"
}

func (c *SeriesController) GetSeriesList() {
	studyuid := c.GetString("studyuid")
	beego.Info("study uid:", studyuid)
	result := models.GetSeries(studyuid)
	c.Data["json"] = &result
	c.ServeJSON()

}
