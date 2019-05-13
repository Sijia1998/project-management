import React, { Component } from 'react';
import { Table, Avatar } from 'antd';
import { getCusInfo } from '@/api/user'

class AdminPage extends Component {
  state = {
    userInfo: []
  }
  async componentDidMount() {
    let res = await getCusInfo();
    console.log(res.data.data)
    let arr = [];
    res.data.data.map(item => {
      arr.push({
        userName: [item.userName, item.userPic],
        email: item.email,
        phone: item.phone
      })
    })
    this.setState({
      userInfo: arr
    })
  }
  render() {
    const columns = [
      {
        title: '用户名',
        dataIndex: 'userName',
        render: (text, record) => {
          console.log('record', record)
          return (
            <div style={{ verticalAlign: 'middle' }}>
              <Avatar style={{ verticalAlign: 'middle', marginRight: 10 }} src={record.userName[1]} />
              <a style={{ verticalAlign: 'middle' }} href="javascript:;">{record.userName[0]}</a>
            </div>
          )
        },
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
      },
    ];

    const userInfo = this.state.userInfo
    return (
      <div><Table columns={columns} dataSource={userInfo} /></div>
    )
  }
}

export default AdminPage