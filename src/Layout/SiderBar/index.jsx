import React, { Component } from 'react'
// import styles from './style.less'
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
import { routes, commonRoutes } from '@/config/menu'
import { connect } from 'react-redux'
const { Sider } = Layout;
const { SubMenu } = Menu;



class SiderBar extends Component {
  getMenuList = () => {
    const { userInfo: { userType } } = this.props
    // 根据用户类型渲染路由组件
    const Router = userType === '0' ? routes : commonRoutes
    return Router.map(submenu => (
      <SubMenu key={submenu.key} title={<span><Icon type={submenu.iconType} />{submenu.title}</span>}>
        {submenu.children.map(menu => (
          <Menu.Item key={menu.key}><Link to={menu.path}>{menu.title}</Link></Menu.Item>
        ))}
      </SubMenu>
    ))
  }
  render() {
    return (<Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        // theme="dark"
        defaultOpenKeys={['goods_info']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {this.getMenuList()}
      </Menu>
    </Sider>)
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.login
  }
}

export default connect(mapStateToProps)(SiderBar)