import React, { Component } from 'react'
import styles from './style.less'
import { Card, Button, Modal, message, Input, InputNumber, DatePicker, Select } from 'antd';
import { createOrder } from '@/api/order'
import moment from 'moment'

const confirm = Modal.confirm;
const Option = Select.Option;

class GoodsItem extends Component {
  state = {
    visible: false,
    endTime: moment().format('YYYY-MM-DD'),
    number: '1',
    orderType: '0'
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOnChange = time => {
    this.setState({
      endTime: moment(time).format('YYYY-MM-DD')
    })
  }
  handleSelect = type => {
    console.log(type);
    this.setState({
      orderType: type
    })
  }
  handleNumber = number => {
    this.setState({
      number: number
    })
  }
  handleOk = async (id, note) => {
    let data = {
      _id: id,
      endTime: this.state.endTime,
      number: this.state.number,
      orderType: this.state.orderType,
      note: note
    }
    let res = await createOrder(data)
    if (res.data.status === 0) {
      message.success('租借成功');
      this.setState({
        visible: false
      })
    } else {
      message.error('租借失败')
    }
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    const { productId, productName, productPrice, productType, imgUrl, note, total, numberIng, numberDone, noteForC, deposit } = this.props
    const goodsType = {
      'ride': '代步工具',
      'bed': '床上用品',
      'electron': '电子产品',
      'daily': '生活用品'
    }
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
            <div>备注:{noteForC}</div>
            <div style={{ position: 'absolute', bottom: 20 }}>
              <Button type="primary" style={{ width: 200, height: 30 }} onClick={() => this.showModal(productId)}>租借</Button>
            </div>
          </div>
        </Card>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={() => this.handleOk(productId, note)}
          onCancel={this.handleCancel}
        >
          <div className={styles['modal-wrapper']}>
            <div className="flex-item">
              <span>租赁类型</span>
              <Select style={{ width: 120 }} onChange={this.handleSelect} defaultValue={this.state.orderType} placeholder="请选择">
                <Option value="0">个人</Option>
                <Option value="1">团体</Option>
              </Select></div>
            <div className="flex-item">
              <span>物品数量</span>
              <InputNumber onChange={this.handleNumber} min={1} defaultValue={1} />
            </div>
            <div className="flex-item">
              <span>结束时间</span>
              <DatePicker
                onChange={this.handleOnChange}
                defaultValue={moment()}
                format="YYYY-MM-DD"
              />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default GoodsItem