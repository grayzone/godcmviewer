package models

// MetaInfo contains the dicom meta tags
type MetaInfo struct {
	FileMetaInformationGroupLength  string
	FileMetaInformationVersion      string
	MediaStorageSOPClassUID         string
	MediaStorageSOPInstanceUID      string
	TransferSyntaxUID               string
	ImplementationClassUID          string
	ImplementationVersionName       string
	SourceApplicationEntityTitle    string
	SendingApplicationEntityTitle   string
	ReceivingApplicationEntityTitle string
	PrivateInformationCreatorUID    string
	PrivateInformation              string
}
