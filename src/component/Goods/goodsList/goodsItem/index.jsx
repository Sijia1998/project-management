import React, { Component } from 'react'
import styles from './style.less'
import { Card, Button, message, Modal, Form, InputNumber, Input, Select } from 'antd';
import { deleteProduct, updateProduct } from '@/api/product'


const confirm = Modal.confirm;
const { Meta } = Card;
const { Option } = Select
const { TextArea } = Input;



class GoodsItem extends Component {
  state = {
    visible: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleSubmit = (productId) => {
    const { getGoodsList } = this.props
    const { form: { validateFields }, history } = this.props;
    validateFields(async (err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log('validateFields', validateFields)
      let res = await updateProduct(Object.assign({ _id: productId }, fieldsValue))
      if (res.data.status === 1) {
        message.error(res.data.msg)
      } else {
        message.success('修改成功');
        getGoodsList()
        this.setState({
          visible: false,
        });
      }
    });
  }
  handleOk = (productId) => {
    this.handleSubmit(productId)
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  showConfirm = (id) => {
    const { getGoodsList } = this.props
    console.log('id1', id)
    confirm({
      title: '是否要删除此物品?',
      async onOk() {
        console.log('id', id)
        let res = await deleteProduct(id)
        if (res.data.status === 0) {
          message.success('删除成功')
          getGoodsList()
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  render() {
    const { productId, productName, productPrice, productType, imgUrl, total, numberIng, numberDone, noteForC, deposit, note, form: { getFieldDecorator } } = this.props
    const goodsType = {
      'ride': '代步工具',
      'bed': '床上用品',
      'electron': '电子产品',
      'daily': '生活用品'
    }
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
      <div className={styles['card-wrapper']}>
        <Card
          hoverable
          bordered
          style={{ width: 240 }}
          cover={<div style={{ height: 200, backgroundImage: `url(${imgUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center' }} />}
        >
          <div style={{ height: 220 }}>
            <div>
              <p>商品名称:{productName}</p>
              <p>商品类型:{goodsType[productType]}</p>
            </div>
            <div className="card-price-wrapper">
              <span>{`押金:${deposit}`}</span>
              <span>{`价格:${productPrice}`}</span>
            </div>
            <div className="card-number-wrapper">
              <span className="card-number-style">{`在租:${numberIng}`}</span>
              <span className="card-number-style">{`故障:${numberDone}`}</span>
              <span className="card-number-style">{`总计:${total}`}</span>
            </div>
            <div>备注:{note}</div>
            <div>用户备注:{noteForC}</div>
            <div style={{ display: 'flex', position: 'relative', top: 20, justifyContent: 'space-around' }}>
              <Button type="primary" style={{ width: 70, height: 30 }} onClick={() => this.showModal(productId)}>编辑</Button>
              <Button type="danger" style={{ width: 70, height: 30 }} onClick={() => this.showConfirm(productId)}>删除</Button>
            </div>
          </div>
        </Card>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={() => this.handleOk(productId)}
          onCancel={this.handleCancel}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ width: '80%', margin: '0 auto', marginTop: 20 }}>
            <Form.Item
              label="物品名称"
            >
              {getFieldDecorator('name', {
                initialValue: productName,
                rules: [{ required: true, message: '请输入物品名称!' }],
              })(
                <Input style={{ width: 200 }} placeholder="请输入物品名称" />
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
                initialValue: total,
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
                initialValue: productPrice,

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
                initialValue: deposit,
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
                initialValue: note,
                rules: [{ required: true, message: '请输入备注信息' }],
              })(
                <TextArea placeholder="请输入备注信息" style={{ width: 200 }} autosize={{ minRows: 4, maxRows: 6 }} />
              )}
            </Form.Item>
            <Form.Item
              label="用户备注信息"
            >
              {getFieldDecorator('noteForC', {
                initialValue: noteForC,
                rules: [{ required: true, message: '请输入备注信息' }],
              })(
                <TextArea placeholder="请输入备注信息" style={{ width: 200 }} autosize={{ minRows: 4, maxRows: 6 }} />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(GoodsItem)