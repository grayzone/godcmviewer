package controllers

import (
	"github.com/astaxie/beego"
	"github.com/grayzone/godcmviewer/models"
)

type SliceController struct {
	beego.Controller
}

func (c *SliceController) Get() {
	c.TplName = "slice.html"
	c.Layout = "layout.html"
}

func (c *SliceController) GetSliceList() {
	seriesuid := c.GetString("seriesuid")
	beego.Info("series uid:", seriesuid)
	result := models.GetSlices(seriesuid)
	c.Data["json"] = &result
	c.ServeJSON()

}
