import React, { Component } from 'react'
// import styles from './style.less'
import { Table } from 'antd';
import { connect } from 'react-redux'

const columns = [{
  title: '标题',
  dataIndex: 'applyTitle',
}, {
  title: '详细内容',
  dataIndex: 'applyContent',
}, {
  title: '申请类型',
  dataIndex: 'applyType',
}, {
  title: '申请时间',
  dataIndex: 'startTime',
}, {
  title: '申请人',
  dataIndex: 'applyUser',
}];

class TableView extends Component {
  getSourceData = () => {
    const { applyList } = this.props;
    let data = []
    applyList.map((item) => {
      data.push({
        key: item.id,
        applyTitle: item.applyTitle,
        applyContent: item.applyContent,
        applyType: item.applyType,
        startTime: item.startTime,
        applyUser: item.applyUser,
      })
    })
    return data
  }

  render() {
    let data = this.getSourceData()
    console.log(data)
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    applyList: state.bussiness.apply
  }
}


export default connect(mapStateToProps)(TableView)
