import React from "react";
import * as PIXI from "pixi.js";
import { Row, Col, Button, Icon } from "antd";
import $ from "jquery";
import URL from "url";

var Container = PIXI.Container;
var autoDetectRenderer = PIXI.autoDetectRenderer;
var loader = PIXI.loader;
var resources = PIXI.loader.resources;
var Sprite = PIXI.Sprite;

export default class Slice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slice: null
    };
  }

  getSliceInfo = sliceuid => {
    var url = "/sliceinfo";
    $.ajax({
      url: url,
      dataType: "json",
      type: "POST",
      cache: false,
      async: false,
      data: {
        sliceuid: sliceuid
      },
      success: data => {
        console.log("get the slice info.", data);
        this.setState({
          slice: data
        });
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString());
      }
    });
  };
  checkIsWebGLSupported = () => {
    var type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
      type = "Canvas";
    }
    PIXI.utils.sayHello(type);
  };
  initRender = () => {
    var slice = this.state.slice;
    //  console.log(slice);
    console.log(slice.Columns, slice.Rows);
    this.renderer = autoDetectRenderer(256, 256);
    //this.renderer.autoResize = true;
    //this.renderer.resize(slice.Columns, slice.Rows);

    this.refs.container.appendChild(this.renderer.view);
  };
  setup = () => {
    var slice = this.state.slice;
    this.sprite = new Sprite(resources[slice.Filepath].texture);
    //this.sprite.width = slice.Columns;
    //this.sprite.height = slice.Rows;
    this.stage = new Container();
    this.stage.addChild(this.sprite);

    this.renderer.autoResize = true;
    this.renderer.resize(slice.Columns, slice.Rows);

    this.loop();
  };

  loop = () => {
    this.renderer.render(this.stage);
  };

  handleZoomInClick = () => {
    // console.log("zoom in");
    this.stage.scale.x *= 1.1;
    this.stage.scale.y *= 1.1;
    this.stage.width *= 1.1;
    this.stage.height *= 1.1;
    this.renderer.resize(this.stage.width, this.stage.height);

    this.renderer.render(this.stage);
  };
  handleZoomOutClick = () => {
    this.stage.scale.x *= 0.9;
    this.stage.scale.y *= 0.9;
    this.stage.width *= 0.9;
    this.stage.height *= 0.9;
    this.renderer.resize(this.stage.width, this.stage.height);

    this.renderer.render(this.stage);
  };
  componentWillMount() {
    this.checkIsWebGLSupported();

    var p = URL.parse(window.location.href, true);
    // console.log(p);
    var sliceuid = p.path.substr(7);
    //     console.log(sliceuid);

    this.getSliceInfo(sliceuid);
  }
  loadProgressHandler = (loader, resource) => {
    console.log(
      "loading: " + resource.url + ", progress:" + loader.progress + "%"
    );
  };
  componentDidMount() {
    //     console.log("componentDidMount");
    this.initRender();
    loader
      .add(this.state.slice.Filepath)
      .on("progress", this.loadProgressHandler)
      .load(this.setup);
  }
  render() {
    return (
      <Row>
        <Col>
          <Button onClick={this.handleZoomInClick}>
            <Icon type="plus" />
          </Button>
          <Button onClick={this.handleZoomOutClick}>
            <Icon type="minus" />
          </Button>
        </Col>
        <Col>
          <div ref="container" />
        </Col>
      </Row>
    );
  }
}
