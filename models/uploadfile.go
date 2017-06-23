package models

import (
	"log"
	"time"

	"github.com/astaxie/beego/orm"
)

type UploadStatus int64

const (
	UPLOADED UploadStatus = iota
	IMPORTING
	IMPORTED
	FAILED
)

type UploadFile struct {
	ID       int64 `orm:"pk;auto;column(id)"`
	Filepath string
	Status   UploadStatus
	Created  time.Time `orm:"auto_now_add;type(datetime)"`
	Updated  time.Time `orm:"auto_now;type(datetime)"`
}

func (f *UploadFile) TableName() string {
	return "uploadfile"
}

func (f *UploadFile) Insert() error {
	f.Status = UPLOADED
	o := orm.NewOrm()
	o.Begin()
	id, err := o.Insert(f)
	if err != nil {
		log.Println(err.Error())
		o.Rollback()
		return err
	}
	f.ID = id
	o.Commit()
	return nil
}
