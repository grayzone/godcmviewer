package models

// DcmDataset contains all the dicom elements
type DcmDataset struct {
	PatientName  string
	PatientID    string
	Modality     string
	Rows         string
	Columns      string
	WindowWidth  string
	WindowCenter string
}
