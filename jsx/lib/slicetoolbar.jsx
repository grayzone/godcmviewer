import React from "react";
import { Tag } from "antd";

import Zoom from "../component/zoom";
import Pen from "../component/pen";

export default class SliceToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }

  render() {
    return (
      <div>
        <Zoom {...this.props} />
        <Pen {...this.props} />
      </div>
    );
  }
}
