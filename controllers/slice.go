package controllers

import (
	"strconv"

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

func (c *SliceController) GetSlice() {
	sliceuid := c.GetString("sliceuid")
	beego.Info("slice id", sliceuid)
	var s models.Slice
	id, _ := strconv.Atoi(sliceuid)
	s.ID = int64(id)
	s.Get()

	c.Data["json"] = &s
	c.ServeJSON()
}
