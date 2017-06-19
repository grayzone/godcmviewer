package util

import "github.com/grayzone/godcm/core"

func ImportDicomFile(filepath string) error {
	var reader core.DcmReader
	reader.IsReadValue = true
	err := reader.ReadFile(filepath)
	if err != nil {
		return err
	}
	studyuid := reader.Dataset.StudyInstanceUID()
	sopuid := reader.Dataset.SOPInstanceUID()

}
