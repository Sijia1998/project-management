import React, { Component } from 'react'
import styles from './style.less'
import { Card, Button, message, Modal } from 'antd';
import { deleteProduct } from '@/api/product'

const confirm = Modal.confirm;
const { Meta } = Card;

const showConfirm = (id) => {
  console.log('id1', id)
  confirm({
    title: '是否要删除此物品?',
    async onOk() {
      console.log('id', id)
      let res = await deleteProduct(id)
      if (res.data.status === 0) {
        message.success('删除成功')
      }
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

class GoodsItem extends Component {
  render() {
    const { productId, productName, productPrice, productType, imgUrl, total, numberIng, numberDone, noteForC, deposit, note } = this.props
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
            <div>备注:{note}</div>
            <div>用户备注:{noteForC}</div>
            <div style={{ display: 'flex', position: 'relative', top: 20, justifyContent: 'space-around' }}>
              <Button type="primary" style={{ width: 70, height: 30 }} onClick={() => showConfirm(productId)}>编辑</Button>
              <Button type="danger" style={{ width: 70, height: 30 }} onClick={() => showConfirm(productId)}>删除</Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default GoodsItem