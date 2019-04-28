import React, { Component } from 'react'
// import styles from './style.less'
import { Table, Divider, Modal, Form, message } from 'antd';
import { connect } from 'react-redux'
import * as business from '@/store/businessStore/actionCreators'
import * as custom from '@/store/customStore/actionCreators'
import { deleteApply, updateApply, getApplyDetail } from '@/api/apply'
import ModalForm from '@/component/Modal/ApplyModal'

const confirm = Modal.confirm;

function showDeleteConfirm(record) {
  confirm({
    title: '确定要删除此项吗?',
    // content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    async onOk() {
      console.log(record.key);
      let res = await deleteApply(record.key)
      if (res.data.status === '0') {
        message.success('删除成功!')
      }
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

class TableView extends Component {
  state = {
    visible: false,
    formValue: null
  }
  getSourceData = () => {
    const { applyList, userApplyList, userType } = this.props;
    console.log('applyList', applyList)
    console.log('userApplyList', userApplyList)
    let data = []
    let list = userType === '0' ? applyList : userApplyList
    list.map((item) => {
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
      let res = await updateApply(Object.assign(formValue, values))
      console.log('Received values of form: ', values);
      console.log('Received : ', res);
      form.resetFields();
      this.setState({ visible: false, formValue: null });
    });
  }

  showModal = async record => {
    let res = await getApplyDetail(record.key)
    this.setState({ visible: true, formValue: res.data.data });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    let data = this.getSourceData()
    const { userType } = this.props
    const adminColumns = [{
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
          <a href="javascript:;" onClick={() => this.showModal(record)}>查看</a>
          <Divider type="vertical" />
          <a href="javascript:;" style={{ color: 'red' }} onClick={() => showDeleteConfirm(record)}>删除</a>
        </span >
      ),
    }];
    const userColumns = [{
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
    const { getApplyList, getUserApplyList, userType } = this.props;
    if (userType === '0') {
      getApplyList()
    } else {
      getUserApplyList()
    }
  }
}


const mapStateToProps = state => {
  return {
    applyList: state.bussiness.apply,
    userApplyList: state.custom.apply,
    userType: state.login.userType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getApplyList() {
      dispatch(business.handleApplyList())
    },
    getUserApplyList() {
      dispatch(custom.handleApplyList())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(TableView))
