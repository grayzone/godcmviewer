package controllers

import (
	"github.com/astaxie/beego"
)

type UploadController struct {
	beego.Controller
}

func (c *UploadController) Get() {
	c.TplName = "upload.html"
	c.Layout = "layout.html"
}
