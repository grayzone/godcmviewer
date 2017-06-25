package models

import (
	"log"
	"time"

	"github.com/astaxie/beego/orm"
	"github.com/grayzone/godcm/core"
	"github.com/grayzone/godcm/dcmmodel"
)

type Patient struct {
	ID int64 `orm:"pk;auto;column(id)"`
	dcmmodel.Patient
	Created time.Time `orm:"auto_now_add;type(datetime)"`
	Updated time.Time `orm:"auto_now;type(datetime)"`
	Study   []Study   `orm:"-"`
}

func (p *Patient) Parse(dataset core.DcmDataset) error {
	p.Patient.Parse(dataset)

	var s Study
	s.Parse(dataset)
	p.Study = append(p.Study, s)
	return nil
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

	for i := range p.Study {
		p.Study[i].Insert()
	}
	return nil
}
