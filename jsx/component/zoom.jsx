import React from "react";
import * as PIXI from "pixi.js";
import { Tag } from "antd";

export default class Zoom extends React.Component {
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
        onChange={this.handleZoomChange}
      >
        Zoom
      </Tag.CheckableTag>
    );
  }
  handleZoomChange = checked => {
    //    console.log("check change:", checked);
    this.setState({ checked });

    if (!checked) {
      this.props.stage.interactive = false;
      return;
    }
    this.stage = this.props.stage;
    this.stage.interactive = true;
    this.zoomLevel = 0.005;
    this.stage.on("pointermove", this.doZoom);
    this.stage.on("pointerdown", this.startZoom);
    this.stage.on("pointerup", this.endZoom);
    this.stage.on("pointerout", this.out);
    this.stage.on("pointerupoutside", this.outside);
  };

  out = event => {
    //   console.log("pointer out");
    this.isZooming = false;
  };

  outside = event => {
    //  console.log("pointer outside");
    //  this.isZooming = false;
  };

  doZoom = event => {
    if (!this.isZooming) {
      return;
    }
    //  console.log(event);
    var newPos = event.data.getLocalPosition(this.stage);
    //   console.log("mouse postion:", newPos);

    let offset = event.data.originalEvent.movementY;
    if (offset > 0) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  };
  startZoom = event => {
    this.isZooming = true;
  };

  endZoom = event => {
    this.isZooming = false;
  };

  zoomIn = () => {
    //    console.log("zoom in");

    this.stage.scale.x *= 1 + this.zoomLevel;
    this.stage.scale.y *= 1 + this.zoomLevel;
  };

  zoomOut = () => {
    //  console.log("zoom out");

    this.stage.scale.x *= 1 - this.zoomLevel;
    this.stage.scale.y *= 1 - this.zoomLevel;
  };
}
