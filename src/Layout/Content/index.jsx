import React, { Component } from 'react'
// import styles from './style.less'
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { routes, commonRoutes } from '@/config/menu'
import Charts from '@/component/Charts'
import WelcomeView from '@/component/Welcome'
import { connect } from 'react-redux'
import HomePage from '@/component/HomePage'

const { Content } = Layout;

class ContentView extends Component {
  render() {
    const { userInfo: { userType } } = this.props
    // 根据用户类型渲染路由组件
    const Router = userType === '0' ? routes : commonRoutes
    return (
      <Content style={{
        background: '#fff', padding: 20, marginTop: 20, minHeight: 280, position: 'absolute', width: '80%'
      }}
      >
        <div style={{ height: '100%' }}>
          <Switch>
            {/* 判断用户类型，若是管理员则显示图表，普通用户显示Welcome页 */}
            <Route exact path='/management' component={userType === '0' ? Charts : WelcomeView}></Route>
            {Router.map(route => (
              route.children.map(item => (
                <Route path={item.path} exact key={item.key} component={item.component}></Route>
              ))
            ))}
            <Route exact path='/management/homepage' component={HomePage}></Route>
          </Switch>
        </div>
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.login
  }
}

export default connect(mapStateToProps)(ContentView)