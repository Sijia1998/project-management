import React, { Component } from 'react'
import OneChart from './oneChart'
import TwoChart from './twoChart'
import { connect } from 'react-redux'
import * as business from '@/store/businessStore/actionCreators'
import { Row, Col } from 'antd';

class Charts extends Component {
  render() {
    return <div>
      <Row>
      <Col span={24}>
      <OneChart></OneChart>
      </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col span={12}>
          <h1>代步工具分类情况</h1>
          <TwoChart></TwoChart>
        </Col>
        <Col span={12}>
          <h1>生活用品分类情况</h1>
          <TwoChart></TwoChart>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <h1>电子产品分类情况</h1>
          <TwoChart></TwoChart>
        </Col>
        <Col span={12}>
          <h1>床上用品分类情况</h1>
          <TwoChart></TwoChart>
        </Col>
      </Row>
    </div>
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