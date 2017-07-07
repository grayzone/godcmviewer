import React from "react";
import * as PIXI from "pixi.js";

//var Graphics = PIXI.Graphics;

export default class MovingBlock extends PIXI.Graphics {
  constructor() {
    super();
    console.log("new moving block");
  }

  render() {
    console.log("render the block");
    //    this.block = new Graphics();
    this.interactive = true;
    this.lineStyle(0, 0xff3300, 1);
    this.beginFill(0x66ccff);

    this.drawRect(0, 0, 64, 64);
    this.endFill();
    this.x = 170;
    this.y = 170;

    this.mousedown = this.mousedownFunc;
    this.mouseup = this.mouseupFunc;
    this.mousemove = this.mousemoveFunc;
    this.rightclick = this.rightclickFunc;
  }

  mousedownFunc = event => {
    console.log("mouse down:", event);
    this.alpha = 0.5;
    this.data = event.data;
    this.dragging = true;
  };

  mouseupFunc = event => {
    console.log("mouse up", event);
    this.alpha = 1;
    this.data = null;
    this.dragging = false;
  };

  mousemoveFunc = event => {
    if (!this.dragging) {
      return;
    }
    console.log("mouse move:", event);
    var newPos = event.data.getLocalPosition(this.parent);
    console.log("mouse postion:", newPos);
    this.position.x = newPos.x - this.width / 2;
    this.position.y = newPos.y - this.height / 2;
  };

  rightclickFunc = event => {
    console.log("right click:", event);
    this.visible = false;
    document.getElementById("slice").oncontextmenu = e => {
      e.preventDefault();
    };
  };
}
