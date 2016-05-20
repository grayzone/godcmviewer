package models

// DcmDataset contains all the dicom elements
type DcmDataset struct {
	PatientName    string
	PatientID      string
	Modality       string
	SOPInstanceUID string
	Rows           string
	Columns        string
	WindowWidth    string
	WindowCenter   string
	PixelData      string
	//	PixelWidth     string
	//	PixelHeight    string
	BitsAllocated string
	BitsStored    string
	HighBit       string
}
