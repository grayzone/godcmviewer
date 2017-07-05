package main

import (
	"github.com/astaxie/beego"
	_ "github.com/grayzone/godcmviewer/routers"
)

func main() {
	beego.SetStaticPath("/data", "data")
	beego.Run()
}
