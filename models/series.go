package models

import (
	"log"
	"time"

	"github.com/astaxie/beego/orm"
)

type Series struct {
	ID                int64  `orm:"pk;auto"`
	Seriesinstanceuid string `orm:"unique"`
	Seriesnumber      string
	Modality          string

	Created time.Time `orm:"auto_now_add;type(datetime)"`
	Updated time.Time `orm:"auto_now;type(datetime)"`
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
	return nil
}
