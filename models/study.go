package models

import (
	"fmt"
	"time"

	"github.com/astaxie/beego/orm"
	"github.com/grayzone/godcm/core"
	"github.com/grayzone/godcm/dcmmodel"
)

type Study struct {
	ID int64 `orm:"pk;auto;column(id)"`
	dcmmodel.Study
	PatientUID int64     `orm:"column(patientuid)"`
	Created    time.Time `orm:"auto_now_add;type(datetime)"`
	Updated    time.Time `orm:"auto_now;type(datetime)"`
	Series     []Series  `orm:"-"`
}

func (s *Study) Parse(dataset core.DcmDataset) error {
	s.Study.Parse(dataset)

	var ser Series
	ser.Parse(dataset)
	s.Series = append(s.Series, ser)
	return nil
}

func (s Study) Get() error {
	o := orm.NewOrm()
	err := o.Read(s)
	return err
}

func (s Study) isExisted() bool {
	o := orm.NewOrm()
	err := o.Read(&s, "StudyInstanceUID")
	if err == nil {
		return true
	}
	return false
}

func (s *Study) Insert() error {
	o := orm.NewOrm()
	if !s.isExisted() {
		id, err := o.Insert(s)
		if err != nil {
			e := fmt.Errorf("failed to insert study:%v", err)
			return e
		}
		s.ID = id
	}
	for i := range s.Series {
		s.Series[i].StudyUID = s.ID
		s.Series[i].Insert()
	}

	return nil
}

func GetStudies(patientuid string) []Study {
	var result []Study
	o := orm.NewOrm()
	o.QueryTable("study").Filter("patientuid", patientuid).OrderBy("-Created").All(&result)
	return result
}
