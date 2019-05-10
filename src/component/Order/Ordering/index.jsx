import React, { Component } from 'react'
import { Table, Divider, Modal, Form, message } from 'antd';
import { connect } from 'react-redux'
import * as business from '@/store/businessStore/actionCreators'
import * as custom from '@/store/customStore/actionCreators'
import { deleteOrder, getOrderDetail, updateOrder } from '@/api/order'
import ModalForm from '@/component/Modal/OrderModal'

const confirm = Modal.confirm;


function showDeleteConfirm(record) {
  confirm({
    title: '确定要删除此项吗?',
    // content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    async onOk() {
      let res = await deleteOrder(record.key)
      if (res.data.status === '0') {
        message.success('删除成功！')
      }
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

class RentList extends Component {
  state = {
    visible: false,
    formValue: null
  }
  getSourceData = () => {
    const { rentList, userRentList, userType } = this.props;
    console.log('rentList', rentList)
    console.log('userRentList', userRentList)
    let data = []
    let orderList = userType === '0' ? rentList : userRentList
    orderList.map((item) => {
      data.push({
        key: item._id,
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
  handleDelete = data => {
    window.alert(data)
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    const { formValue } = this.state
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      let res = await updateOrder(Object.assign(formValue, values))
      console.log('Received values of form: ', values);
      console.log('Received : ', res);
      form.resetFields();
      this.setState({ visible: false, formValue: null });
    });
  }

  showModal = async record => {
    let res = await getOrderDetail(record.key)
    this.setState({ visible: true, formValue: res.data.data });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const { userType } = this.props
    const data = this.getSourceData()
    const orderTypeObj = {
      '0': '故障报修',
      '1': '物品续租'
    }
    const adminColumns = [{
      title: '订单名称',
      dataIndex: 'orderName',
    }, {
      title: '订单类型',
      dataIndex: 'orderType',
      render: (text, record) => {
        console.log(record.orderType)
        return (
          <span>{orderTypeObj[`${record.orderType}`]}</span>
        )
      }
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
      title: '备注',
      dataIndex: 'note',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={() => this.showModal(record)}>查看</a>
          <Divider type="vertical" />
          <a href="javascript:;" style={{ color: 'red' }} onClick={() => showDeleteConfirm(record)}>删除</a>
        </span >
      ),
    }];
    const userColumns = [{
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
      title: '备注',
      dataIndex: 'note',
    }];
    const columns = userType === '0' ? adminColumns : userColumns

    return (
      <div>
        <Table columns={columns} dataSource={data} />
        {this.state.visible ? <ModalForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={() => this.handleCreate(this.state.formValue)}
          formValue={this.state.formValue}
        /> : null}
      </div>
    )
  }
  componentDidMount() {
    const { getOrderList, getUserOrderList, userType } = this.props;
    if (userType === '0') {
      getOrderList()
    } else {
      getUserOrderList()
    }
  }
}

const mapStateToProps = state => {
  return {
    rentList: state.bussiness.orders,
    userRentList: state.custom.orders,
    userType: state.login.userType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrderList() {
      dispatch(business.handleOrder())
    },
    getUserOrderList() {
      dispatch(custom.handleOrder())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RentList))