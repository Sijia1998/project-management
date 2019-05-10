import React, { Component, Fragment } from 'react'
import GoodsItem from './goodsItem'
import styles from './style.less'
import { connect } from 'react-redux';
import * as custom from '@/store/customStore/actionCreators'

const NoProductInfo = function () {
  return <div>无数据</div>
}

const ProductList = function (props) {
  const { productlist } = props
  return <Fragment>
    {
      productlist.map(item => (
        <GoodsItem
          key={item._id}
          imgUrl={item.productPic}
          productId={item._id}
          productName={item.name}
          productPrice={item.price}
          productType={item.productType}
          total={item.total}
          numberIng={item.numberIng}
          numberDone={item.numberDone}
          noteForC={item.noteForC}
          note={item.note}
          deposit={item.deposit}
        >
        </GoodsItem>
      )
      )
    }
  </Fragment>
}

class UserGoodsList extends Component {
  render() {
    const { goodsList } = this.props;
    console.log(goodsList)
    return (
      <div className={styles['goods-container']}>
        {goodsList.length !== 0 ? <ProductList productlist={goodsList}></ProductList> : <NoProductInfo></NoProductInfo>}
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
    goodsList: state.custom.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // 获取物品列表
    getGoodsList() {
      dispatch(custom.handleProduct())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGoodsList)