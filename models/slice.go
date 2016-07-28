package models

import (
	"log"
	"time"

	"github.com/astaxie/beego/orm"
)

type Slice struct {
	Id                        int64  `orm:"pk;auto"`
	Sopinstanceuid            string `orm:"unique"`
	Imagenumber               string
	Imagetype                 string
	Highbit                   string
	Rows                      string
	Columns                   string
	Bitsallocated             string
	Bitsstored                string
	Samplesperpixel           string
	Pixelrepersentation       string
	Photometricinterpretation string
	Windowwidth               string
	Windowcenter              string

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
	i.Id = id

	o.Commit()
	return nil
}
