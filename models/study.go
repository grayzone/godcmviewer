package models

import (
	"log"
	"time"

	"github.com/astaxie/beego/orm"
)

type Study struct {
	Id                 int64  `orm:"pk;auto"`
	Studyinstanceuid   string `orm:"unique"`
	Studyid            string
	Studydate          string
	Studytime          string
	Referringphysician string
	Accessionnumber    string

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
	s.Id = id

	o.Commit()
	return nil
}
