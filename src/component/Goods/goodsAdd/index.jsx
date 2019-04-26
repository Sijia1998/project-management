import React, { Component } from 'react'
import {
  Form, InputNumber, Button, Input, Select
} from 'antd';
import { addProduct } from '@/api/product'
import ToolBar from '@/component/ToolSteps'
const { TextArea } = Input;
const Option = Select.Option;


class GoodsAdd extends Component {
  handleSubmit = (e) => {
    const { form: { validateFields } } = this.props;
    e.preventDefault();
    validateFields(async (err, fieldsValue) => {
      if (err) {
        return;
      }
      let res = await addProduct(fieldsValue)
      console.log('data', fieldsValue)
      console.log('res', res)
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
        <ToolBar></ToolBar>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ width: '80%', margin: '0 auto', marginTop: 20 }}>
          <Form.Item
            label="物品名称"
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入物品名称!' }],
            })(
              <Input style={{ width: 200 }} placeholder="请输入物品名称" />
            )}
          </Form.Item>
          <Form.Item
            label="物品类型"
          >
            {getFieldDecorator('productType', {
              rules: [{ required: true, message: '请选择物品类型!' }],
            })(
              <Select style={{ width: 120 }} placeholder="请选择">
                <Option value="daily">生活用品</Option>
                <Option value="bed">床上用品</Option>
                <Option value="electron">电子产品</Option>
                <Option value="ride">代步工具</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="物品价格"
          >
            {getFieldDecorator('price', {
              initialValue: '100',
              rules: [{ required: true, message: '请输入物品价格!' }],
            })(
              <InputNumber
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                style={{ width: 80 }} />
            )}
          </Form.Item>
          <Form.Item
            label="押金"
          >
            {getFieldDecorator('deposit', {
              initialValue: '20',
              rules: [{ required: true, message: '请输入押金!' }],
            })(
              <InputNumber
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                style={{ width: 80 }} />
            )}
          </Form.Item>
          <Form.Item
            label="备注信息"
          >
            {getFieldDecorator('noteForC', {
              rules: [{ required: true, message: '请输入备注信息' }],
            })(
              <TextArea placeholder="请输入备注信息" style={{ width: 200 }} autosize={{ minRows: 4, maxRows: 6 }} />
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

export default Form.create()(GoodsAdd);