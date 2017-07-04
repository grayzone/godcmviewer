package models

import (
	"fmt"
	"time"

	"github.com/astaxie/beego/orm"
	"github.com/grayzone/godcm/core"
	"github.com/grayzone/godcm/dcmmodel"
)

type Series struct {
	ID int64 `orm:"pk;auto;column(id)"`
	dcmmodel.Series
	StudyUID int64     `orm:"column(studyuid)"`
	Created  time.Time `orm:"auto_now_add;type(datetime)"`
	Updated  time.Time `orm:"auto_now;type(datetime)"`
	Slice    []Slice   `orm:"-"`
}

func (s *Series) Parse(dataset core.DcmDataset) error {
	s.Series.Parse(dataset)

	var sli Slice
	sli.Parse(dataset)
	s.Slice = append(s.Slice, sli)
	return nil
}

func (s Series) Get() error {
	o := orm.NewOrm()
	err := o.Read(s)
	return err
}

func (s *Series) isExisted() bool {
	o := orm.NewOrm()
	var tmp Series
	tmp.SeriesInstanceUID = s.SeriesInstanceUID
	err := o.Read(&tmp, "SeriesInstanceUID")
	if err == nil {
		s.ID = tmp.ID
		return true
	}
	return false
}

func (s *Series) Insert() error {
	o := orm.NewOrm()
	if !s.isExisted() {
		id, err := o.Insert(s)
		if err != nil {
			e := fmt.Errorf("failed to insert series:%v", err)
			return e
		}
		s.ID = id
	}

	for i := range s.Slice {
		s.Slice[i].SeriesUID = s.ID
		s.Slice[i].Insert()
	}

	return nil
}

func GetSeries(studyuid string) []Series {
	var result []Series
	o := orm.NewOrm()
	o.QueryTable("Series").Filter("StudyUID", studyuid).OrderBy("-Created").All(&result)
	return result
}
