import React, { Component } from 'react'
import GoodsItem from './goodsItem'
import styles from './style.less'
import { connect } from 'react-redux';


class UserGoodsList extends Component {
  render() {
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const { goodsList } = this.props;
    console.log(goodsList)
    return (
      <div className={styles['goods-container']}>
        {goodsList.map(item => (
          <GoodsItem key={item.id} productName={item.name} productPrice={item.price} productType={item.productType}></GoodsItem>)
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    goodsList: state.custom.products
  }
}

export default connect(mapStateToProps)(UserGoodsList)