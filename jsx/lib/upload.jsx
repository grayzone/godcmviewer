import React from "react";
import $ from "jquery";
import { Upload, Icon, Button } from "antd";

export default class UploadDcm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filelist: []
    };
  }

  handleChange = info => {
    console.log("some changes when uploading the files:", info);
  };

  handleRemove = file => {
    console.log("remove the upload file:", file);
  };

  render() {
    const fileList = [];
    const props = {
      action: "/upload/dicom",
      name: "dicom",
    //  listType: "picture",
      multiple: true,
      defaultFileList: this.state.filelist,
      onChange: this.handleChange,
      onRemove: this.handleRemove
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
