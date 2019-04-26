import React, { Component } from 'react'
// import styles from './style.less'
import { Table, Divider } from 'antd';
import { connect } from 'react-redux'



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

  handleDelete = data => {
    window.alert(data)
  }

  render() {
    let data = this.getSourceData()
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
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">查看</a>
          <Divider type="vertical" />
          <a href="javascript:;" style={{ color: 'red' }} onClick={() => this.handleDelete(record.startTime)}>删除</a>
        </span >
      ),
    }];
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
