package controllers

import (
	"github.com/astaxie/beego"
)

type UploadController struct {
	beego.Controller
}

func (this *UploadController) Post() {
	f, h, _ := this.GetFile("uploadfile")
	f.Close()
	this.SaveToFile("uploadfile", "./static/files/"+h.Filename)
	this.Ctx.WriteString("ok")
}
