import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/store'
import styles from './App.less'
import router from '../router'

class Views extends Component {
  render() {
    return (
      <HashRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <div className={styles['wrapper']}>
              {router.map((route, key) => (
                <Route path={route.path} key={key} exact={route.exact} component={route.component}></Route>
              ))}
            </div>
          </PersistGate>
        </Provider>
      </HashRouter>
    )
  }
}

export default Views
