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
      //      console.log("disable pen");
      return;
    }
    //   console.log("enable pen");

    this.stage = this.props.stage;
    this.stage.interactive = true;

    this.stage.on("pointerdown", this.pointerDown);
    this.stage.on("pointerup", this.pointerUp);
    this.stage.on("pointermove", this.pointerMove);
  };

  release = stage => {
    this.props.stage.interactive = false;
  };

  pointerDown = event => {
    this.painting = true;
    this.pen = new Graphics();
    this.pen.beginFill(0xffffff);
    
   
    this.pointerMove();
  };
  pointerUp = event => {
    this.painting = false;
    this.pen.endFill();
    this.pen.destroy();
  };
  pointerMove = event => {
    if (!this.painting) {
      return;
    }
    this.pen.drawCircle(0, 0, 10);
    console.log("moving pen event:", event);
    console.log("global position:", event.data.global);
    this.pen.position.copy(event.data.global);
    
    this.stage.addChild(this.pen);
  };
}
