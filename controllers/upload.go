package controllers

import (
	"os"

	"github.com/astaxie/beego"
	"github.com/grayzone/godcmviewer/util"
)

type UploadController struct {
	beego.Controller
}

func init() {
	go importDICOM()
}

var (
	dicomfile = make(chan string)
)

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
	/*
		var upload models.UploadFile
		upload.Filepath = h.Filename
		upload.Insert()



		util.ImportDicomFile(downloadFolder + "/" + h.Filename)
	*/
	dicomfile <- downloadFolder + "/" + h.Filename
	result := "ok"
	this.Data["json"] = &result
	this.ServeJSON()
}

func importDICOM() {
	for {
		select {
		case f := <-dicomfile:
			util.ImportDicomFile(f)

			//			beego.Info("imported dicom file:", f)
			//		default:
			//			beego.Info("no file imported")

		}
	}
}
