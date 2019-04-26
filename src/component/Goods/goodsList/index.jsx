import React, { Component } from 'react'
// import styles from './style.less'
import { Table } from 'antd';
import { connect } from 'react-redux'

const columns = [{
  title: '物品名称',
  dataIndex: 'name',
}, {
  title: '价格',
  dataIndex: 'price',
}, {
  title: '押金',
  dataIndex: 'deposit',
}, {
  title: '已租',
  dataIndex: 'numberOver',
}, {
  title: '正在租',
  dataIndex: 'numberIng',
}, {
  title: '未租',
  dataIndex: 'numberDone',
}, {
  title: '备注',
  dataIndex: 'noteForC',
}, {
  title: '物品种类',
  dataIndex: 'productType',
}];

class TableView extends Component {
  getSourceData = () => {
    const { goodsList } = this.props;
    let data = []
    goodsList.map((item) => {
      data.push({
        key: item.id,
        name: item.name,
        price: item.price,
        deposit: item.deposit,
        numberOver: item.numberOver,
        numberIng: item.numberIng,
        numberDone: item.numberDone,
        noteForCL: item.noteForC,
        productType: item.productType
      })
    })
    return data
  }

  render() {
    let data = this.getSourceData()
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    goodsList: state.bussiness.products
  }
}


export default connect(mapStateToProps)(TableView)
