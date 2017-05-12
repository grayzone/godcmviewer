import React from "react";
import { Menu, Button, Icon } from "antd";
import $ from "jquery";

export default class GoDCMMenu extends React.Component {
  render() {
    const MenuItemGroup = Menu.ItemGroup;
    return (
      <Menu mode="horizontal">
        <Menu.Item>
          <a href="/"><b>GoDcmViewer</b></a>
        </Menu.Item>
        <Menu.Item key="list">
          <a href="/">List</a>
        </Menu.Item>
        <Menu.Item key="admin">
          <a href="/admin">Admin</a>
        </Menu.Item>
      </Menu>
    );
  }
}
