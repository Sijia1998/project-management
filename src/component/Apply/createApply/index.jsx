import React, { Component } from 'react'
import {
  Form, InputNumber, Button, Input, Select
} from 'antd';
const { TextArea } = Input;
const Option = Select.Option;

class CreateApply extends Component {
  handleSubmit = (e) => {
    const { form: { validateFields } } = this.props;
    e.preventDefault();
    validateFields(async (err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log('data', fieldsValue)
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
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
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ width: '80%', margin: '0 auto', marginTop: 20 }}>
          <Form.Item
            label="申请标题"
          >
            {getFieldDecorator('applyTitle', {
              rules: [{ required: true, message: '请输入申请标题!' }],
            })(
              <Input style={{ width: 200 }} placeholder="请输入申请标题!" />
            )}
          </Form.Item>
          <Form.Item
            label="申请信息"
          >
            {getFieldDecorator('applyContent', {
              rules: [{ required: true, message: '请输入详细的申请信息' }],
            })(
              <TextArea placeholder="请输入详细的申请信息" style={{ width: 200 }} autosize={{ minRows: 4, maxRows: 6 }} />
            )}
          </Form.Item>
          <Form.Item
            label="申请类型"
          >
            {getFieldDecorator('applyType', {
              rules: [{ required: true, message: '请选择申请类型!' }],
            })(
              <Select style={{ width: 120 }} placeholder="请选择">
                <Option value="0">故障报修</Option>
                <Option value="1">物品续租</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(CreateApply)