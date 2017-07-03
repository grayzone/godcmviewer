package models

import (
	"time"

	"fmt"

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

func (p *Patient) isExisted() bool {
	o := orm.NewOrm()
	var tmp Patient
	tmp.PatientID = p.PatientID
	err := o.Read(&tmp, "PatientID")
	if err == nil {
		p.ID = tmp.ID
		return true
	}
	return false
}

func (p *Patient) Insert() error {
	o := orm.NewOrm()
	if !p.isExisted() {
		id, err := o.Insert(p)
		if err != nil {
			e := fmt.Errorf("failed to insert patient:%v", err)
			return e
		}
		p.ID = id
	}
	for i := range p.Study {
		p.Study[i].PatientUID = p.ID
		p.Study[i].Insert()
	}
	return nil
}

func GetPatients() []Patient {
	var result []Patient
	o := orm.NewOrm()
	o.QueryTable("patient").OrderBy("-Created").All(&result)
	return result
}
