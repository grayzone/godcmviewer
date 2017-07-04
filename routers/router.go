package routers

import (
	"github.com/astaxie/beego"
	"github.com/grayzone/godcmviewer/controllers"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/upload", &controllers.UploadController{})
	beego.Router("/admin", &controllers.AdminController{})
	beego.Router("/study/?:id", &controllers.SeriesController{})
	beego.Router("/series/?:id", &controllers.SliceController{})

	beego.Router("/patientlist", &controllers.PatientController{}, "GET:GetPatientList")
	beego.Router("/studylist", &controllers.StudyController{}, "POST:GetStudyList")
	beego.Router("/serieslist", &controllers.SeriesController{}, "POST:GetSeriesList")
	beego.Router("/slicelist", &controllers.SliceController{}, "POST:GetSliceList")

	beego.Router("/upload/dicom", &controllers.UploadController{}, "POST:UploadDicom")

}
