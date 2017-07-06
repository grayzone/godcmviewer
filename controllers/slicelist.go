package controllers

import (
	"github.com/astaxie/beego"
	"github.com/grayzone/godcmviewer/models"
)

type SliceListController struct {
	beego.Controller
}

func (c *SliceListController) Get() {
	c.TplName = "slicelist.html"
	c.Layout = "layout.html"
}

func (c *SliceListController) GetSliceList() {
	seriesuid := c.GetString("seriesuid")
	beego.Info("series uid:", seriesuid)
	result := models.GetSlices(seriesuid)
	c.Data["json"] = &result
	c.ServeJSON()

}
