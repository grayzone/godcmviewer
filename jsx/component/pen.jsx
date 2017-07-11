import React from "react";
import * as PIXI from "pixi.js";
import { Tag } from "antd";

var Graphics = PIXI.Graphics;

export default class Pen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  render() {
    return (
      <Tag.CheckableTag
        checked={this.state.checked}
        onChange={this.handlePenChange}
      >
        Pen
      </Tag.CheckableTag>
    );
  }
  handlePenChange = checked => {
    this.setState({ checked });

    if (!checked) {
      this.release();
      console.log("disable pen");
      return;
    }
    console.log("enable pen");

    this.create();
  };

  create = () => {
    console.log("create pen");
    this.pen = new Graphics();
    this.props.stage.addChild(this.pen);
    this.pen.interactive = true;
    this.pen.buttonMode = true;
    this.pen.hitArea = new PIXI.Rectangle(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );

    this.pen.on("pointerdown", this.onStartPaint);
    this.pen.on("pointermove", this.onPainting);
    this.pen.on("pointerup", this.onEndPaint);
    this.pen.on("pointerupoutside", this.onEndPaint);
  };

  release = () => {
    this.pen.destroy();
  };

  onStartPaint = event => {
    console.log("onStartPaint");
    this.painting = true;
    this.pen.data = event.data;
    this.pen.beginFill(0xffd900);
    this.pen.lineStyle(1, 0xffd900, 0.5);
  };
  onEndPaint = event => {
    console.log("onEndPaint");
    this.pen.endFill();
    this.painting = false;
    this.pen.data = null;
  };
  onPainting = event => {
    //    console.log("onPainting");
    if (!this.painting) {
      return;
    }
    //   console.log("data:", this.pen.data);
    let pos = this.pen.data.getLocalPosition(this.pen.parent);
    //    console.log("postion:", pos);
    this.pen.moveTo(pos.x, pos.y);
    //this.pen.lineTo(pos.x, pos.y);
    this.pen.drawCircle(pos.x, pos.y, 1);
  };
}
