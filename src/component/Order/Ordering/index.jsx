import React, { Component } from 'react'
import { Table } from 'antd';
import { connect } from 'react-redux'

const columns = [{
  title: '订单名称',
  dataIndex: 'orderName',
}, {
  title: '订单类型',
  dataIndex: 'orderType',
}, {
  title: '开始时间',
  dataIndex: 'startTime',
}, {
  title: '结束时间',
  dataIndex: 'endTime',
}, {
  title: '押金',
  dataIndex: 'deposit',
}, {
  title: '物品名称',
  dataIndex: 'productName',
}, {
  title: '备注',
  dataIndex: 'note',
}];
class RentList extends Component {
  getSourceData = () => {
    const { rentList } = this.props;
    let data = []
    rentList.map((item) => {
      data.push({
        key: item.id,
        orderName: item.orderName,
        orderType: item.orderType,
        deposit: item.deposit,
        startTime: item.startTime,
        endTime: item.endTime,
        productName: item.productName,
        note: item.note,
      })
    })
    return data
  }
  render() {
    const data = this.getSourceData()
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    rentList: state.bussiness.orders
  }
}

export default connect(mapStateToProps)(RentList)