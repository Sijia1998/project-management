import React, { Component } from 'react'
import GoodsItem from './goodsItem'
import styles from './style.less'
import { connect } from 'react-redux';
import * as business from '@/store/businessStore/actionCreators'



class GoodsList extends Component {
  render() {
    const { goodsList } = this.props;
    console.log(goodsList)
    return (
      <div className={styles['goods-container']}>
        {goodsList.map(item => (
          <GoodsItem
            key={item.id}
            imgUrl={item.img}
            productName={item.name}
            productPrice={item.price}
            productType={item.productType}
            numberOver={item.numberOver}
            numberIng={item.numberIng}
            numberDone={item.numberDone}
            noteForC={item.noteForC}
            deposit={item.deposit}
          >
          </GoodsItem>
        )
        )}
      </div>
    )
  }
  componentDidMount() {
    const { getGoodsList } = this.props;
    getGoodsList();
  }
}

const mapStateToProps = state => {
  return {
    goodsList: state.bussiness.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // 获取物品列表
    getGoodsList() {
      dispatch(business.handleProduct())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsList)