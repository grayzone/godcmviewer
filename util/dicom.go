package util

import (
	"os"

	"fmt"

	"github.com/grayzone/godcm/core"
	"github.com/grayzone/godcmviewer/models"
)

func ImportDicomFile(filepath string) error {
	var reader core.DcmReader
	reader.IsReadValue = true
	reader.IsReadPixel = true
	err := reader.ReadFile(filepath)
	if err != nil {
		return err
	}
	var patient models.Patient
	patient.Parse(reader.Dataset)
	err = patient.Insert()
	/*
		if err != nil {
			return err
		}
	*/
	workSpacePath, _ := os.Getwd()
	dataFolder := workSpacePath + "/data/"
	studyInstanceUID := patient.Study[0].StudyInstanceUID
	studyFolder := dataFolder + studyInstanceUID
	// fmt.Println("study folder:", studyFolder)
	err = os.MkdirAll(studyFolder, 0644)
	if err != nil {
		fmt.Println(err.Error())
	}
	newpath := studyFolder + "/" + reader.Dataset.SOPInstanceUID()

	os.Rename(filepath, newpath)

	err = reader.Convert2PNG(newpath)
	if err != nil {
		return err
	}
	var s models.Slice
	s.SOPInstanceUID = reader.Dataset.SOPInstanceUID()
	s.Filepath = "/data/" + studyInstanceUID + ".png"
	err = s.UpdateFilepathBySOP()

	return err
}
