import React, { Component } from 'react'
import { Modal, Form, Input, Select } from 'antd';

const Option = Select.Option;

class ModelView extends Component {
  render() {
    const {
      visible, onCancel, onCreate, form, formValue
    } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="修改"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="horizontal" {...formItemLayout}>
          <Form.Item label="订单状态">
            {getFieldDecorator('applyStatus', {
              initialValue: formValue.applyStatus,
              rules: [{ required: true, message: '请选择订单状态!' }],
            })(
              <Select style={{ width: 120 }} placeholder="请选择">
                <Option value="0">未开始</Option>
                <Option value="1">进行中</Option>
                <Option value="2">已结束</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="标题">
            {getFieldDecorator('applyTitle', {
              initialValue: formValue.applyTitle,
              rules: [{ required: true, message: '请输入标题!' }],
            })(
              <Input style={{ width: 200 }} />
            )}
          </Form.Item>
          <Form.Item label="详细信息">
            {getFieldDecorator('applyContent', {
              initialValue: formValue.applyContent,
              rules: [{ required: true, message: '请输入详细信息!' }],
            })(
              <Input style={{ width: 200 }} />
            )}
          </Form.Item>
          <Form.Item label="申请类型">
            {getFieldDecorator('applyType', {
              initialValue: formValue.applyType,
              rules: [{ required: true, message: '请输入详细信息!' }],
            })(
              <Select style={{ width: 120 }} placeholder="请选择">
                <Option value="0">故障报修</Option>
                <Option value="1">物品续租</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="开始时间">
            {getFieldDecorator('startTime', {
              initialValue: formValue.startTime,
              rules: [{ required: true, message: '请输入详细信息!' }],
            })(
              <Input disabled style={{ width: 200 }} />
            )}
          </Form.Item>
          <Form.Item label="申请人">
            {getFieldDecorator('applyUser', {
              initialValue: formValue.applyUser,
              rules: [{ required: true, message: '请输入详细信息!' }],
            })(
              <Input disabled style={{ width: 200 }} />
            )}
          </Form.Item>
          <Form.Item label="联系方式">
            {getFieldDecorator('phone', {
              initialValue: formValue.phone,
              rules: [{ required: true, message: '请输入详细信息!' }],
            })(
              <Input disabled style={{ width: 200 }} />
            )}
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              initialValue: formValue.email,
              rules: [{ required: true, message: '请输入详细信息!' }],
            })(
              <Input disabled style={{ width: 200 }} />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ModelView)