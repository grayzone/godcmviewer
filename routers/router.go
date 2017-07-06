package routers

import (
	"github.com/astaxie/beego"
	"github.com/grayzone/godcmviewer/controllers"
)

func init() {
	beego.Router("/", &controllers.PatientListController{})
	beego.Router("/upload", &controllers.UploadController{})
	beego.Router("/admin", &controllers.AdminController{})
	beego.Router("/study/?:id", &controllers.SeriesListController{})
	beego.Router("/series/?:id", &controllers.SliceListController{})
	beego.Router("/slice/?:id", &controllers.SliceController{})

	beego.Router("/patientlist", &controllers.PatientListController{}, "GET:GetPatientList")
	beego.Router("/studylist", &controllers.StudyListController{}, "POST:GetStudyList")
	beego.Router("/serieslist", &controllers.SeriesListController{}, "POST:GetSeriesList")
	beego.Router("/slicelist", &controllers.SliceListController{}, "POST:GetSliceList")

	beego.Router("/upload/dicom", &controllers.UploadController{}, "POST:UploadDicom")

}
