package controllers

import (
	"github.com/grayzone/godcm/core"
	"github.com/grayzone/godcmviewer/models"
)

var filepath = ".\\static\\data\\IM-0001-0010.dcm"

// GetMetaInfo gets meta information from file.
func (c *DatasetController) GetMetaInfo() {
	var meta models.MetaInfo
	var reader core.DcmReader
	err := reader.ReadFile(filepath)
	if err != nil {
		c.Ctx.WriteString(err.Error())
		return
	}

	meta.FileMetaInformationGroupLength = reader.Meta.FileMetaInformationGroupLength()
	meta.FileMetaInformationVersion = reader.Meta.FileMetaInformationVersion()
	meta.MediaStorageSOPClassUID = reader.Meta.MediaStorageSOPClassUID()
	meta.MediaStorageSOPInstanceUID = reader.Meta.MediaStorageSOPInstanceUID()
	meta.TransferSyntaxUID = reader.Meta.TransferSyntaxUID()
	meta.ImplementationClassUID = reader.Meta.ImplementationClassUID()
	meta.ImplementationVersionName = reader.Meta.ImplementationVersionName()
	meta.SourceApplicationEntityTitle = reader.Meta.SourceApplicationEntityTitle()
	meta.SendingApplicationEntityTitle = reader.Meta.SendingApplicationEntityTitle()
	meta.ReceivingApplicationEntityTitle = reader.Meta.ReceivingApplicationEntityTitle()
	meta.PrivateInformationCreatorUID = reader.Meta.PrivateInformationCreatorUID()
	meta.PrivateInformation = reader.Meta.PrivateInformation()

	c.Data["json"] = &meta
	c.ServeJSON()
}

// GetDatasetInfo gets data elmements information
func (c *DatasetController) GetDatasetInfo() {
	var dataset models.DcmDataset
	var reader core.DcmReader
	reader.IsReadValue = true
	err := reader.ReadFile(filepath)
	if err != nil {
		c.Ctx.WriteString(err.Error())
		return
	}
	dataset.PatientID = reader.Dataset.PatientID()
	dataset.PatientName = reader.Dataset.PatientName()
	dataset.Modality = reader.Dataset.Modality()
	dataset.Rows = reader.Dataset.Rows()
	dataset.Columns = reader.Dataset.Columns()

	c.Data["json"] = &dataset
	c.ServeJSON()

}
