import React, { Component } from 'react'
import {
  Form, InputNumber, Button, Input, Select, message, Card, DatePicker
} from 'antd';
import { createApply } from '@/api/apply'
import { withRouter } from 'react-router-dom'
import { reletProduct } from '@/api/product'
import moment from 'moment'

const { Meta } = Card;
const { TextArea } = Input;
const Option = Select.Option;


class CreateApply extends Component {
  state = {
    selectIsShow: false,
    productList: [],
    productPic: ''
  }
  handleSubmit = (e) => {
    const { form: { validateFields }, history } = this.props;
    e.preventDefault();
    validateFields(async (err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log('values', fieldsValue)
      let formData = {
        applyTitle: fieldsValue['applyTitle'],
        applyContent: fieldsValue['applyContent'],
        applyType: fieldsValue['applyType'],
        orderData: {
          endTime: moment(fieldsValue['endTime']).format('YYYY-MM-DD'),
          _id: fieldsValue['productName']
        }
      }
      let result = await createApply(formData)
      console.log('data', result)
      if (result.data.status === 0) {
        message.success('申请提交成功', 2, () => {
          this.props.form.resetFields();
          history.push('/management/own_apply_list')
        });
      } else if (result.data.status === 1) {
        message.error('申请失败')
      }
    });
  }
  handleChange = async key => {
    if (key === '1') {
      this.setState({
        selectIsShow: true
      })
      let res = await reletProduct()
      console.log(res)
      this.setState({
        productList: res.data.data
      })
    } else {
      this.setState({
        selectIsShow: false
      })
    }
  }
  handleSecChange = key => {
    this.state.productList.map(item => {
      if (key === item._id) {
        this.setState({
          productPic: item.productPic,
          productName: item.productName,
          startTime: item.startTime,
          endTime: item.endTime,
          number: item.number
        })
      }
    })
  }
  handleTimeChange = (date) => {
    console.log(moment().format('YYYY-MM-DD'))
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
              <Select style={{ width: 120 }} placeholder="请选择" onChange={this.handleChange}>
                <Option value="0">故障报修</Option>
                <Option value="1">物品续租</Option>
              </Select>
            )}
          </Form.Item>
          {this.state.selectIsShow ? <Form.Item
            label="物品名称"
          >
            {getFieldDecorator('productName', {
              rules: [{ required: true, message: '请选择续租物品!' }],
            })(
              <Select style={{ width: 120 }} placeholder="请选择" onChange={this.handleSecChange}>
                {this.state.productList.map(item => (
                  <Option value={item._id}>{item.orderName}</Option>
                ))}
              </Select>
            )}
          </Form.Item> : null}
          {this.state.productPic ? <Card
            hoverable
            style={{ width: 300, margin: '0 auto' }}
            cover={<img alt="example" src={this.state.productPic} />}
          >
            <Meta title={this.state.productName} />
            <p>数量:{this.state.number}</p>
            <div>
              <Form.Item
                label="结束时间"
              >
                {getFieldDecorator('endTime', {
                  initialValue: moment(this.state.endTime),
                  rules: [{ required: true, message: '请选择时间!' }],
                })(
                  <DatePicker onChange={this.handleTimeChange} />
                )}
              </Form.Item>
            </div>
          </Card> : null}
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

export default Form.create()(withRouter(CreateApply))