import React from "react";
import * as PIXI from "pixi.js";
import { Button } from "antd";

var Graphics = PIXI.Graphics;
var Point = PIXI.Point;

export default class PointMark extends React.Component {
  state = {
    checked: false,
    list: []
  };
  render() {
    if (this.state.checked) {
      return (
        <Button type="primary" onClick={this.handlePointClick}>
          Point
        </Button>
      );
    }
    return <Button onClick={this.handlePointClick}>Point</Button>;
  }
  handlePointClick = e => {
    if (this.state.checked) {
      this.release();
    } else {
      this.create();
    }
    this.setState(prev => ({
      checked: !prev.checked
    }));
  };

  release = () => {};

  create = () => {
    //   console.log("create the component.");
    this.point = new Graphics();
    this.props.stage.addChild(this.point);
    this.point.interactive = true;
    // this.point.buttonMode = true;
    this.point.hitArea = new PIXI.Rectangle(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );

    this.point.on("mousedown", this.start);
    this.point.on("mousemove", this.move);
    this.point.on("mouseup", this.end);
  };

  start = event => {
    this.paiting = true;
    this.point.beginFill(0xffd900, 0.5);
    //this.point.lineStyle(1, 0xffd900, 0.1);
    let pos = event.data.getLocalPosition(this.point.parent);
    //  console.log("postion:", pos);

    this.point.drawCircle(pos.x, pos.y, 1);
    let p = new Point(pos.x, pos.y);
    this.setState(prev => ({
      list: [...prev.list, p]
    }));
    console.log("point list:", this.state.list);
  };

  move = event => {
    if (!this.paiting) {
      return;
    }
    let pos = event.data.getLocalPosition(this.point.parent);
    let p = new Point(pos.x, pos.y);
    this.point.drawCircle(pos.x, pos.y, 1);
    this.setState(prev => ({
      list: [...prev.list, p]
    }));
  };

  end = event => {
    this.paiting = false;
    this.point.drawPolygon(this.state.list);
    this.point.endFill();
    this.setState({
      list: []
    });
  };

  addPoint = event => {
    //console.log("event:", event);

    this.point.beginFill(0xffd900);
    this.point.lineStyle(1, 0xffd900, 0.5);
    let pos = event.data.getLocalPosition(this.point.parent);
    //  console.log("postion:", pos);
    this.point.moveTo(pos.x, pos.y);
    this.point.drawCircle(pos.x, pos.y, 1);
    let p = new Point(pos.x, pos.y);
    this.setState(prev => ({
      list: [...prev.list, p]
    }));
    console.log("point list:", this.state.list);
  };
}
