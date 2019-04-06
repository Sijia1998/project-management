import React, { Component } from 'react'
// import Login from '../component/login'
import { HashRouter, Route, Link } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './App.less'
import router from '../router'

class Views extends React.Component {
  render() {
    return (
      // <div className={styles['wrapper']}>
      //   <Login />
      // </div>
      <HashRouter>
        <div className={styles['wrapper']}>
          {router.map((route, key) => {
            if (route.exact) {
              return <Route exact key={key} path={route.path} render={props => (
                <route.component {...props} routes={route.routes}></route.component>
              )}></Route>
            }
          })}
        </div>
      </HashRouter>
    )
  }
}

export default Views
