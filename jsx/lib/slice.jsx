import React from "react";
import * as PIXI from "pixi.js";
import { Row, Col, Button, Icon, Tag, Radio } from "antd";
import $ from "jquery";
import URL from "url";
import MovingBlock from "../component/movingblock";
import Pen from "../component/pen";
import Zoom from "../component/zoom";

var Container = PIXI.Container;
var autoDetectRenderer = PIXI.autoDetectRenderer;
var loader = PIXI.loader;
var resources = PIXI.loader.resources;
var Sprite = PIXI.Sprite;
var Graphics = PIXI.Graphics;

export default class Slice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: null,
       slice: null,
      supportMode: ""
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
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
      type = "Canvas";
    }
    this.setState({
      supportMode: type
    });
  };
  initRender = () => {
    this.app = new PIXI.Application();
    this.app.stage.interactive = true;
    this.refs.container.appendChild(this.app.view);

    this.refs.container.oncontextmenu = e => {
      e.preventDefault();
    };

    this.setState({
      stage: this.app.stage
    });
  };
  setup = () => {
    var slice = this.state.slice;
    this.sprite = new Sprite(resources[slice.Filepath].texture);

    this.app.stage.addChild(this.sprite);

  };

  loadProgressHandler = (loader, resource) => {
    console.log(
      "loading: " + resource.url + ", progress:" + loader.progress + "%"
    );
  };
  componentDidMount() {
    this.initRender();
    loader
      .add(this.state.slice.Filepath)
      .on("progress", this.loadProgressHandler)
      .load(this.setup);
    this.app.ticker.add(this.play);
  }

  play = () => {
    this.app.renderer.autoResize = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  };

  handleMegnifierMasClick = () => {
    let b = new MovingBlock();
    b.render();
    this.app.stage.addChild(b);
  };

  handleRadioGroupClick = e => {
    console.log("change:", e.target.value);

    switch (e.target.value) {
      case "edit":
        this.handleMaskPenClick();
        break;
    }
  };
  handleMaskPenClick = () => {
    console.log("mask pen");
    let m = new MaskPen();
    m.render();
    // this.app.stage.addChild(m);
    this.app.stage.mask = m;
  };
  componentWillMount() {
    this.checkIsWebGLSupported();

    var p = URL.parse(window.location.href, true);
    // console.log(p);
    var sliceuid = p.path.substr(7);
    //     console.log(sliceuid);

    this.getSliceInfo(sliceuid);
  }
  render() {
    return (
      <Row>
        <Col>
          <Tag color="green">
            {this.state.supportMode}
          </Tag>
          <Zoom stage={this.state.stage} />
          <Pen stage={this.state.stage} />
          <Radio.Group onChange={this.handleRadioGroupClick}>
            <Radio.Button value="edit">Edit</Radio.Button>
          </Radio.Group>
          <Button onClick={this.handleMegnifierMasClick}>
            <Icon type="search" />
          </Button>
          <Button onClick={this.handleMaskPenClick}>
            <Icon type="edit" />
          </Button>
        </Col>
        <Col>
          <div ref="container" />
        </Col>
      </Row>
    );
  }
}
