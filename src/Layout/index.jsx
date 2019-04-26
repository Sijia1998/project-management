import React, { Component } from 'react'
// import styles from './style.less'
import SiderBar from './SiderBar'
import HeaderBar from './Header'
import { Layout } from 'antd';
import Content from './Content'


class SiderDemo extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ height: '100%' }}>
        <HeaderBar></HeaderBar>
        <Layout>
          <SiderBar></SiderBar>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content></Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}


export default SiderDemo
