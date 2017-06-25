package util

import (
	"github.com/grayzone/godcm/core"
	"github.com/grayzone/godcm/models"
)

func ImportDicomFile(filepath string) error {
	var reader core.DcmReader
	reader.IsReadValue = true
	err := reader.ReadFile(filepath)
	if err != nil {
		return err
	}
	var st models.Study
	st.StudyInstanceUID = reader.Dataset.StudyInstanceUID()
	st.StudyDate = reader.Dataset.StudyDate()
	// studyuid := reader.Dataset.StudyInstanceUID()
	// sopuid := reader.Dataset.SOPInstanceUID()

	return nil
}
