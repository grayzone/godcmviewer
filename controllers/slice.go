package controllers

import (
	"github.com/astaxie/beego"
)

type SliceController struct {
	beego.Controller
}

func (c *SliceController) Get() {
	c.TplName = "slice.html"
	c.Layout = "layout.html"
}
