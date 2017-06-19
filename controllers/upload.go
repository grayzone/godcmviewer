package controllers

import (
	"os"

	"github.com/astaxie/beego"
)

type UploadController struct {
	beego.Controller
}

func (this *UploadController) Get() {
	this.TplName = "upload.html"
	this.Layout = "layout.html"
}

func (this *UploadController) UploadDicom() {
	this.Ctx.Request.ParseMultipartForm(32 << 20)
	workSpacePath, _ := os.Getwd()
	downloadFolder := workSpacePath + "/download"
	os.Mkdir(downloadFolder, 0644)

	f, h, err := this.GetFile("dicom")
	defer f.Close()

	if err != nil {
		result := err.Error()
		this.Data["json"] = &result
		this.ServeJSON()
		return
	}

	this.SaveToFile("dicom", downloadFolder+"/"+h.Filename)

	result := "ok"
	this.Data["json"] = &result
	this.ServeJSON()
}
