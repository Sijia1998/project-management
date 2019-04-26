import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import styles from './App.less'
import router from '../router'

class Views extends Component {
  render() {
    return (
      <HashRouter>
        <Provider store={store}>
          <div className={styles['wrapper']}>
            {router.map((route, key) => (
              <Route path={route.path} key={key} exact={route.exact} component={route.component}></Route>
            ))}
          </div>
        </Provider>
      </HashRouter>
    )
  }
}

export default Views
