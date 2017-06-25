package models

import (
	"log"
	"time"

	"github.com/astaxie/beego/orm"
	"github.com/grayzone/godcm/models"
)

type Slice struct {
	ID int64 `orm:"pk;auto;column(id)"`
	models.Slice
	Created time.Time `orm:"auto_now_add;type(datetime)"`
	Updated time.Time `orm:"auto_now;type(datetime)"`
}

func (i Slice) Get() error {
	o := orm.NewOrm()
	err := o.Read(i)
	return err
}

func (i *Slice) Insert() error {
	o := orm.NewOrm()
	o.Begin()

	id, err := o.Insert(i)
	if err != nil {
		log.Println(err.Error())
		o.Rollback()
		return err
	}
	i.ID = id

	o.Commit()
	return nil
}
