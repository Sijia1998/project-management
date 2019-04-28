import React, { Component } from 'react'
import styles from './style.less'
import { Card } from 'antd';

const { Meta } = Card;


class GoodsItem extends Component {
  render() {
    const { productName, productPrice, productType, imgUrl, numberOver, numberIng, numberDone, noteForC, deposit } = this.props
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
              <span className="card-number-style">{`未租:${numberDone}`}</span>
              <span className="card-number-style">{`故障:${numberOver}`}</span>
            </div>
            <div>备注:{noteForC}</div>
          </div>
        </Card>
      </div>
    )
  }
}

export default GoodsItem