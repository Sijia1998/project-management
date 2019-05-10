import React, { Component } from 'react'
import {
  Form, InputNumber, Button, Input, Select, message, Upload, Icon, Modal
} from 'antd';
import { addProduct } from '@/api/product'
import ToolBar from '@/component/ToolSteps'
import { withRouter } from 'react-router-dom'
import styles from './style.less'
// import PicUpload from './upLoad'

const { TextArea } = Input;
const Option = Select.Option;


class GoodsAdd extends Component {
  state = {
    steps: 0,
    success: false
  }
  handleSubmit = (e) => {
    const { form: { validateFields }, history } = this.props;
    e.preventDefault();
    validateFields(async (err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log('validateFields', validateFields)
      let res = await addProduct(fieldsValue)
      if (res.data.status === 0) {
        message.success('添加成功');
        this.setState({
          steps: 1
        })
      } else {
        message.error('添加失败')
      }
    });

  }
  showForm = () => {
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
        {/* <Form.Item
          label="物品图片"
        >
          {getFieldDecorator('productPic', {
            rules: [{ required: true, message: '请上传图片!' }],
          })(
            <PicUpload></PicUpload>
          )}
        </Form.Item> */}
        <Form.Item
          label="物品数量"
        >
          {getFieldDecorator('total', {
            initialValue: '1',
            rules: [{ required: true, message: '请输入物品数量!' }],
          })(
            <InputNumber
              // formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              // parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: 80 }} />
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
          {getFieldDecorator('note', {
            rules: [{ required: true, message: '请输入备注信息' }],
          })(
            <TextArea placeholder="请输入备注信息" style={{ width: 200 }} autosize={{ minRows: 4, maxRows: 6 }} />
          )}
        </Form.Item>
        <Form.Item
          label="用户备注信息"
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
    )
  }

  showFeedBack = () => {
    return (
      <div className="goods-add-feedback">创建成功</div>
    )
  }
  render() {

    const { steps, success } = this.state

    return (
      <div className={styles['goods-add-wrapper']}>
        <ToolBar steps={steps} success={success}></ToolBar>
        {steps === 0 ? this.showForm() : this.showFeedBack()}
      </div>
    );
  }
}

export default withRouter(Form.create()(GoodsAdd));