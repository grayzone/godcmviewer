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
	studyFolder := dataFolder + patient.Study[0].StudyInstanceUID
	// fmt.Println("study folder:", studyFolder)
	err = os.MkdirAll(studyFolder, 0644)
	if err != nil {
		fmt.Println(err.Error())
	}
	newpath := studyFolder + "/" + reader.Dataset.SOPInstanceUID()

	reader.Convert2PNG(newpath)

	os.Rename(filepath, newpath)

	return nil
}
