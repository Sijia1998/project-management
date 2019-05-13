import React, { Component } from 'react'
// import styles from './style.less'
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import { routes, commonRoutes } from '@/config/menu'
import { connect } from 'react-redux'
const { Sider } = Layout;
const { SubMenu } = Menu;

class SiderBar extends Component {
  rootSubmenuKeys = ['goods_info', 'contract_info', 'apply_list'];

  state = {
    activeKey: []
  }
  componentDidMount() {
    const { history } = this.props;
    history.listen(route => {
      console.log('aaa', route);
      this.setState({
        activeKey: [route.pathname.substring(12)]
      })
    })
  }
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

  selectKey = (item) => {
    this.setState({
      activeKey: item.keyPath
    })
    console.log(item);
  }
  // onOpenChange = openKeys => {
  // console.log('open', openKeys);
  // const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
  // if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  // this.setState({ openKeys });
  // } else {
  // this.setState({
  // openKeys: latestOpenKey ? [latestOpenKey] : [],
  // });
  // }
  // };

  render() {
    return (<Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        selectedKeys={this.state.activeKey}
        openKeys={this.rootSubmenuKeys}
        inlineCollapsed={true}
        onSelect={this.selectKey}
        // onOpenChange={this.onOpenChange}
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

export default connect(mapStateToProps)(withRouter(SiderBar))