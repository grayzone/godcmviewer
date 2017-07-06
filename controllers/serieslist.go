package controllers

import (
	"github.com/astaxie/beego"
	"github.com/grayzone/godcmviewer/models"
)

type SeriesListController struct {
	beego.Controller
}

func (c *SeriesListController) Get() {
	c.TplName = "serieslist.html"
	c.Layout = "layout.html"
}

func (c *SeriesListController) GetSeriesList() {
	studyuid := c.GetString("studyuid")
	beego.Info("study uid:", studyuid)
	result := models.GetSeries(studyuid)
	c.Data["json"] = &result
	c.ServeJSON()

}
