import React from "react";
import * as PIXI from "pixi.js";
import { Tag } from "antd";

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
      this.props.stage.interactive = false;
      //      console.log("disable pen");
      return;
    }
    //   console.log("enable pen");
  };
  pointerDown = event => {
    this.dragging = true;
    this.pointerMove();
  };
  pointerUp = event => {
    this.dragging = false;
  };
  pointerMove = event => {
    if (!this.dragging) {
      return;
    }
    console.log("mask pen moving event:", event);
    // this.position.copy(event.data.global);

    console.log("mouse move:", event);
    var newPos = event.data.getLocalPosition(this.parent);
    console.log("mouse postion:", newPos);
    this.position.x = newPos.x - this.width / 2;
    this.position.y = newPos.y - this.height / 2;

    this.beginFill(0xffffff);
    this.drawCircle(this.position.x, this.position.y, 10);
    this.endFill();

    //   app.renderer.render(this);
  };

  rightClick = event => {
    console.log("right click:", event);
    this.destroy();
  };
}
