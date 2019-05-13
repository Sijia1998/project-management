import React, { Component } from 'react'
// import styles from './style.less'
import { Menu, Layout, Avatar, Dropdown, message } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
const { Header } = Layout

const onClick = ({ key }) => {
  if (key === '1') {
    // window.location.hash = '/management/homepage'
  } else if (key === '2') {
    message.success('退出登录')
    localStorage.removeItem('token')
    window.location.hash = '/'
  }
};

const menu = (
  <Menu onClick={onClick} style={{ position: 'relative', top: 20 }}>
    <Menu.Item key="1"><Link to='/management/homepage'>个人主页</Link></Menu.Item>
    <Menu.Item key="2">退出登录</Menu.Item>
  </Menu>
);

class HeaderBar extends Component {
  render() {
    const { userInfo } = this.props;
    return (
      <Header className="header">
        <div className="logo" />
        <span style={{ color: "white", fontSize: "20px" }}><Link to='/management'>旅游用品租赁管理系统</Link></span>
        <div style={{
          float: 'right'
        }}>
          <Dropdown overlay={menu} placement="bottomCenter">
            <a className="ant-dropdown-link" href=" ">
              <Avatar
                icon="user"
                size="large"
                src={userInfo.userPic}
              />
            </ a>
          </Dropdown>
        </div>

      </Header>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.login
  }
}

export default connect(mapStateToProps)(HeaderBar)