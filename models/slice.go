package models

import (
	"fmt"
	"time"

	"github.com/astaxie/beego/orm"
	"github.com/grayzone/godcm/dcmmodel"
)

type Slice struct {
	ID int64 `orm:"pk;auto;column(id)"`
	dcmmodel.Slice
	SeriesUID int64 `orm:"column(seriesuid)"`
	Filepath  string
	Created   time.Time `orm:"auto_now_add;type(datetime)"`
	Updated   time.Time `orm:"auto_now;type(datetime)"`
}

func (s Slice) Get() error {
	o := orm.NewOrm()
	err := o.Read(s)
	return err
}

func (s *Slice) Insert() error {
	o := orm.NewOrm()
	_, _, err := o.ReadOrCreate(s, "SOPInstanceUID")
	if err != nil {
		e := fmt.Errorf("failed to insert slice:%v", err)
		return e
	}

	return nil
}
