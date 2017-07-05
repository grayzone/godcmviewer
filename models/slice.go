package models

import (
	"time"

	"github.com/astaxie/beego/orm"
	"github.com/grayzone/godcm/dcmmodel"
)

type Slice struct {
	ID int64 `orm:"pk;auto;column(id)"`
	dcmmodel.Slice
	SeriesUID int64 `orm:"column(seriesuid)"`
	Filepath  string
	Created   time.Time `orm:"auto_now_add;type(datetime)"`
	Updated   time.Time `orm:"auto_now;type(datetime)"`
}

func (s Slice) Get() error {
	o := orm.NewOrm()
	err := o.Read(s)
	return err
}

func (s *Slice) isExisted() bool {
	o := orm.NewOrm()
	var tmp Slice
	tmp.SOPInstanceUID = s.SOPInstanceUID
	err := o.Read(&tmp, "SOPInstanceUID")
	if err == nil {
		s.ID = tmp.ID
		return true
	}
	return false
}

func (s Slice) Update() error {
	o := orm.NewOrm()
	s.Updated = time.Now()
	_, err := o.Update(&s, "Filepath", "SeriesUID", "Updated")
	return err
}

func (s Slice) UpdateFilepathBySOP() error {
	o := orm.NewOrm()
	_, err := o.QueryTable("slice").Filter("SOPInstanceUID", s.SOPInstanceUID).Update(orm.Params{"Filepath": s.Filepath})
	return err
}

func (s *Slice) Insert() error {
	o := orm.NewOrm()
	if s.isExisted() {
		return s.Update()
	}
	id, err := o.Insert(s)
	if err != nil {
		return err
	}
	s.ID = id
	return nil
}

func GetSlices(seriesuid string) []Slice {
	var result []Slice
	o := orm.NewOrm()
	o.QueryTable("Slice").Filter("SeriesUID", seriesuid).OrderBy("InstanceNumber").All(&result)
	return result
}
