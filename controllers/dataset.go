package controllers

import (
	"io/ioutil"
	"log"

	"github.com/grayzone/godcm/core"
	_ "github.com/grayzone/godcm/dcmimage"
	"github.com/grayzone/godcmviewer/models"
)

var filepath = ".\\static\\data\\xr_chest.dcm"

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

// ConvertToBMP covert the dicom file to BMP file
func (c *DatasetController) ConvertToBMP() {
	//	var reader

}

func saveTofile(filename string, b []byte) {
	err := ioutil.WriteFile(filename, b, 0644)
	if err != nil {
		log.Println(err.Error())
	}
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
	dataset.WindowCenter = reader.Dataset.WindowCenter()
	dataset.WindowWidth = reader.Dataset.WindowWidth()
	dataset.SOPInstanceUID = reader.Dataset.SOPInstanceUID()

	dataset.BitsAllocated = reader.Dataset.BitsAllocated()
	dataset.BitsStored = reader.Dataset.BitsStored()
	dataset.HighBit = reader.Dataset.HighBit()
	dataset.PixelRepresentation = reader.Dataset.PixelRepresentation()

	dataset.NumberOfFrames = reader.Dataset.NumberOfFrames()

	dataset.PhotometricInterpretation = reader.Dataset.PhotometricInterpretation()
	dataset.SamplesPerPixel = reader.Dataset.SamplesPerPixel()

	dataset.RescaleSlope = reader.Dataset.RescaleSlope()
	dataset.RescaleIntercept = reader.Dataset.RescaleIntercept()

	/*
		pixeldata := reader.Dataset.PixelData()
		saveTofile(dataset.SOPInstanceUID, pixeldata)
	*/
	c.Data["json"] = &dataset
	c.ServeJSON()

}
