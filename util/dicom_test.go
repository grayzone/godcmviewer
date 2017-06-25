package util

import (
	"os"
	"testing"
)

func GetTestDataFolder() string {
	cur, err := os.Getwd()
	if err != nil {
		return ""
	}
	result := cur + "/../test/data/"
	return result
}

func TestImportDicomFile(t *testing.T) {
	filepath := GetTestDataFolder() + "GH220.dcm"
	ImportDicomFile(filepath)
}
