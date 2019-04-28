import React, { Component } from 'react'
import PieChart from './pieChart'
import { connect } from 'react-redux'
import * as business from '@/store/businessStore/actionCreators'


class Charts extends Component {
  render() {
    return <div><PieChart></PieChart></div>
  }
  componentDidMount() {
    const { getGoodsList } = this.props
    getGoodsList()
  }
}


const mapDispatchToProps = dispatch => {
  return {
    // 获取物品列表
    getGoodsList() {
      dispatch(business.handleProduct())
    }

  }
}


export default connect(null, mapDispatchToProps)(Charts)