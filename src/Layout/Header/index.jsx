import React, { Component } from 'react'
import styles from './style.less'
import { Menu, Layout, Avatar } from 'antd'
const { Header } = Layout


class HeaderBar extends Component {
  render() {
    return (<Header className="header">
      <div className="logo" />
      <Avatar icon="user" style={{
        float: 'right', top: 15
      }} />
    </Header>)
  }
}

export default HeaderBar