package models

import (
	"log"
	"time"

	"github.com/astaxie/beego/orm"
)

type Patient struct {
	Id               int64  `orm:"pk;auto"`
	Patientid        string `orm:"unique"`
	Patientname      string
	Patientbirthdate string
	Patientsex       string

	Created time.Time `orm:"auto_now_add;type(datetime)"`
	Updated time.Time `orm:"auto_now;type(datetime)"`
}

func (p Patient) Get() error {
	o := orm.NewOrm()
	err := o.Read(p)
	return err
}

func (p *Patient) Insert() error {
	o := orm.NewOrm()
	o.Begin()

	id, err := o.Insert(p)
	if err != nil {
		log.Println(err.Error())
		o.Rollback()
		return err
	}
	p.ID = id

	o.Commit()
	return nil
}
