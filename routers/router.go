package routers

import (
	"github.com/astaxie/beego"
	"github.com/grayzone/godcmviewer/controllers"
)

func init() {
	beego.Router("/", &controllers.MainController{})

	beego.Router("/getmetainfo", &controllers.DatasetController{}, "GET:GetMetaInfo")
	beego.Router("/getdatasetinfo", &controllers.DatasetController{}, "GET:GetDatasetInfo")
	beego.Router("/uploaddcmfile", &controllers.UploadController{})

}
