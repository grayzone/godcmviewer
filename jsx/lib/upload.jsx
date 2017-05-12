import React from "react";
import $ from "jquery";
import { Upload,Icon, Button } from "antd";

export default class UploadDcm extends React.Component {
  render() {
    const fileList = [];
    const props = {
      action: "/upload",
      listType: "picture",
      multiple :true,
      defaultFileList: [...fileList]
    };
    return (
      <div>
        <Upload {...props}>
          <Button> <Icon type="upload" />Upload</Button>
        </Upload>
      </div>
    );
  }
}
