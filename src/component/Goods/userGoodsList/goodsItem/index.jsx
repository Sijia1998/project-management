import React, { Component } from 'react'
import styles from './style.less'
import { Card } from 'antd';

const { Meta } = Card;


class GoodsItem extends Component {
  render() {
    const { productName, productPrice, productType } = this.props
    return (
      <Card
        hoverable
        bordered
        style={{ width: 240 }}
        cover={<img alt="example" style={{ height: 200 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
      >
        <div>
          <div>
            <p>商品名称:{productName}</p>
            <p>商品类型:{productType}</p>
          </div>
          <span>{`价格:${productPrice}`}</span>
        </div>
      </Card>
    )
  }
}

export default GoodsItem