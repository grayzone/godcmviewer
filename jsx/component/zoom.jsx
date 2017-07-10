import * as PIXI from "pixi.js";

export default class Zoom {
  render = stage => {
    this.stage = stage;

    this.zoomLevel = 0.01;

    this.width = this.stage.width;
    this.height = this.stage.height;

    this.stage.on("pointermove", this.doZoom);
    this.stage.on("pointerdown", this.startZoom);
    this.stage.on("pointerup", this.endZoom);
  };

  doZoom = event => {
    if (!this.isZooming) {
      return;
    }
    console.log(event);
    var newPos = event.data.getLocalPosition(this.stage);
    console.log("mouse postion:", newPos);
    console.log(
      event.data.originalEvent.movementX,
      event.data.originalEvent.movementY
    );
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
    console.log("zoom in");

    this.stage.scale.x *= 1 + this.zoomLevel;
    this.stage.scale.y *= 1 + this.zoomLevel;
    this.width *= 1 + this.zoomLevel;
    this.height *= 1 + this.zoomLevel;
  };

  zoomOut = () => {
    console.log("zoom out");

    this.stage.scale.x *= 1 - this.zoomLevel;
    this.stage.scale.y *= 1 - this.zoomLevel;
    this.width *= 1 - this.zoomLevel;
    this.height *= 1 - this.zoomLevel;
  };
}
