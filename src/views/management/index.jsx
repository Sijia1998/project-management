import React, { Component } from 'react'
import Layout from '@/Layout'
import { connect } from 'react-redux'
import * as business from '@/store/businessStore/actionCreators'
import * as custom from '@/store/customStore/actionCreators'

class Management extends Component {
  componentDidMount() {
    const { getGoodsList, userInfo, getOwnInfo } = this.props
    if (userInfo.userType === '0') {
      getGoodsList()
      window.alert('111')
    } else if (userInfo.userType === '1') {
      getOwnInfo()
    }
  }
  render() {
    return <Layout></Layout>
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.login
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // 获取商家所有信息
    getGoodsList() {
      dispatch(business.handleGoodsList())
    },
    // 获取用户所有信息
    getOwnInfo() {
      dispatch(custom.handleOwnInfo())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Management)