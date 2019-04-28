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
          <Form.Item label="订单名称">
            {getFieldDecorator('orderName', {
              initialValue: formValue.orderName,
              rules: [{ required: true, message: '请输入标题!' }],
            })(
              <Input style={{ width: 200 }} />
            )}
          </Form.Item>
          <Form.Item label="订单类型">
            {getFieldDecorator('orderType', {
              initialValue: formValue.orderType,
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
          <Form.Item label="结束时间">
            {getFieldDecorator('endTime', {
              initialValue: formValue.endTime,
              rules: [{ required: true, message: '请输入详细信息!' }],
            })(
              <Input style={{ width: 200 }} />
            )}
          </Form.Item>
          <Form.Item label="押金">
            {getFieldDecorator('deposit', {
              initialValue: formValue.deposit,
              rules: [{ required: true, message: '请输入详细信息!' }],
            })(
              <Input disabled style={{ width: 200 }} />
            )}
          </Form.Item>
          <Form.Item label="物品名称">
            {getFieldDecorator('productName', {
              initialValue: formValue.productName,
              rules: [{ required: true, message: '请输入详细信息!' }],
            })(
              <Input disabled style={{ width: 200 }} />
            )}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator('note', {
              initialValue: formValue.note,
              rules: [{ required: true, message: '请输入详细信息!' }],
            })(
              <Input style={{ width: 200 }} />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ModelView)