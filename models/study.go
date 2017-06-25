package models

import (
	"log"
	"time"

	"github.com/astaxie/beego/orm"
	"github.com/grayzone/godcm/core"
	"github.com/grayzone/godcm/dcmmodel"
)

type Study struct {
	ID int64 `orm:"pk;auto;column(id)"`
	dcmmodel.Study
	Created time.Time `orm:"auto_now_add;type(datetime)"`
	Updated time.Time `orm:"auto_now;type(datetime)"`
	Series  []Series  `orm:"-"`
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

func (s *Study) Insert() error {
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

	for i := range s.Series {
		s.Series[i].Insert()
	}

	return nil
}
