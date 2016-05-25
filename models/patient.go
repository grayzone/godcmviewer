package models

import (
	"log"
	"time"

	"github.com/astaxie/beego/orm"
)

// Study is for the study information
type Study struct {
	ID               int64  `orm:"pk;auto"`
	StudyInstanceUID string `orm:"unique"`
	PatientName      string
	PatientID        string

	Created time.Time `orm:"auto_now_add;type(datetime)"`
	Updated time.Time `orm:"auto_now;type(datetime)"`
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
	return nil
}
