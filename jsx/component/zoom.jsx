import React from "react";
import * as PIXI from "pixi.js";
import { Button } from "antd";

export default class Zoom extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    zoomLevel: 0.05
  };

  render() {
    return (
      <Button.Group>
        <Button icon="plus" onClick={this.handleZoomIn} />
        <Button icon="minus" onClick={this.handleZoomOut} />
      </Button.Group>
    );
  }

  handleZoomIn = e => {
    this.props.stage.scale.x *= 1 + this.state.zoomLevel;
    this.props.stage.scale.y *= 1 + this.state.zoomLevel;
  };

  handleZoomOut = e => {
    this.props.stage.scale.x *= 1 - this.state.zoomLevel;
    this.props.stage.scale.y *= 1 - this.state.zoomLevel;
  };
}
