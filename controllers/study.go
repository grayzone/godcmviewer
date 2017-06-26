package controllers

import "github.com/astaxie/beego"

type StudyController struct {
	beego.Controller
}

func (c *StudyController) Get() {
	c.TplName = "study.html"
	c.Layout = "layout.html"
}
