package controllers

import (
	"github.com/astaxie/beego"
)

type AdminController struct {
	beego.Controller
}

func (c *AdminController) Get() {
	c.TplName = "admin.html"
	c.Layout = "layout.html"
}
