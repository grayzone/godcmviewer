package models

import (
	"log"
	"time"

	"github.com/astaxie/beego/orm"
	"github.com/grayzone/godcm/core"
	"github.com/grayzone/godcm/dcmmodel"
)

type Series struct {
	ID int64 `orm:"pk;auto;column(id)"`
	dcmmodel.Series
	Created time.Time `orm:"auto_now_add;type(datetime)"`
	Updated time.Time `orm:"auto_now;type(datetime)"`
	Slice   []Slice   `orm:"-"`
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

func (s *Series) Insert() error {
	o := orm.NewOrm()
	o.Begin()

	id, err := o.Insert(s)
	if err != nil {
		log.Println(err.Error())
		o.Rollback()
		return err
	}
	s.ID = id

	o.Commit()

	for i := range s.Slice {
		s.Slice[i].Insert()
	}

	return nil
}
