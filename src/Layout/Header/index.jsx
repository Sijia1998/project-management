import React, { Component } from 'react'
import styles from './style.less'
import { Menu, Layout, Avatar } from 'antd'
const { Header } = Layout


class HeaderBar extends Component {
  render() {
    return (<Header className="header">
      <div className="logo" />
      <span style={{ color: "white", fontSize: "20px" }}>旅游用品租赁管理系统</span>
      <Avatar icon="user" style={{
        float: 'right', top: 15
      }} size="large" />
    </Header>)
  }
}

export default HeaderBar