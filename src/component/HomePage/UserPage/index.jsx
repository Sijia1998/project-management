import React, { Component } from 'react'
import { Form, Input, Upload, Icon, message, Button, InputNumber } from 'antd'
import { connect } from 'react-redux'
import {updateUserInfo} from '@/api/user'
import * as custom from '@/component/Login/store/actionCreators'


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}


class UserPage extends Component {
  state = {
    loading: false,
    change: true
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  handleButton = () => {
    this.setState({
      change: false
    })
  }

  handleSubmit = (e) => {
    const { form: { validateFields } ,updateInfo} = this.props;
    e.preventDefault();
    validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let res = await updateUserInfo(values)
        console.log(res.data.status)
        if (res.data.status === 0) {
          message.success('修改成功')
          this.setState({
            change: true
          })
          updateInfo()
        } else {
          message.error(res.data.msg)
        }
      }
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  componentWillMount() {
    const { userInfo } = this.props
    this.setState({
      imageUrl: userInfo.userPic
    })
  }
  render() {
    const { form: { getFieldDecorator }, userInfo } = this.props;
    const { change } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
          label="头像"
        >
          {getFieldDecorator('userPic', {
            initialValue: userInfo.userPic,
            // valuePropName: 'fileList',
            // getValueFromEvent: this.normFile,
          })(
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} style={{ width: 100, height: 100 }} alt="头像" /> : uploadButton}
            </Upload>
          )}
        </Form.Item>
        <Form.Item
          label="用户名"
        >
          {getFieldDecorator('userName', {
            initialValue: userInfo.userName,
            rules: [
              { required: true, message: '请输入您要修改的用户名!' },
            ],
          })(
            <Input disabled={change} style={{ width: 200 }}></Input>
          )}
        </Form.Item>
        <Form.Item
          label="密码"
        >
          {getFieldDecorator('passWord')(
            <Input disabled={change} style={{ width: 200 }}></Input>
          )}
        </Form.Item>
        <Form.Item
          label="邮箱"
        >
          {getFieldDecorator('email', {
            initialValue: userInfo.email,
            rules: [
              { required: true, message: '请输入您的邮箱!' },
            ],
          })(
            <Input disabled={change} type="email" style={{ width: 200 }}></Input>
          )}
        </Form.Item>
        <Form.Item
          label="手机号"
        >
          {getFieldDecorator('phone', {
            initialValue: userInfo.phone,
            rules: [
              { required: true, message: '请输入您的联系方式!' },
            ],
          })(
            <Input disabled={change} type="phone" style={{ width: 200 }}></Input>
          )}
        </Form.Item>
        <Form.Item
          label="余额"
        >
          {getFieldDecorator('money', {
            initialValue: userInfo.money || 200,
            rules: [
              { required: true, message: '请输入您的联系方式!' },
            ],
          })(
            <InputNumber disabled={change}></InputNumber>
          )}
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          {change ? <Button type="primary" onClick={this.handleButton}>修改信息</Button> : <Button type="primary" onClick={this.handleSubmit}>完成</Button>}
        </div>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.login
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // 获取物品列表
    updateInfo() {
      dispatch(custom.updateUserInfo())
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UserPage))