package routers

import (
	"github.com/astaxie/beego"
	"github.com/grayzone/godcmviewer/controllers"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/upload", &controllers.UploadController{})
	beego.Router("/admin", &controllers.AdminController{})
	beego.Router("/study/?:id", &controllers.StudyController{})

	beego.Router("/patientlist", &controllers.PatientController{}, "GET:GetPatientList")
	beego.Router("/studylist", &controllers.StudyController{}, "POST:GetStudyList")

	beego.Router("/upload/dicom", &controllers.UploadController{}, "POST:UploadDicom")

}
