import React, { Component, Fragment } from 'react'
import GoodsItem from './goodsItem'
import styles from './style.less'
import { connect } from 'react-redux';
import * as business from '@/store/businessStore/actionCreators'

const NoProductInfo = function () {
  return <div>无数据</div>
}

const ProductList = function (props) {
  const { productlist, getGoodsList } = props
  return <Fragment>
    {
      productlist.map((item, idx) => (
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
          getGoodsList={getGoodsList}
        >
        </GoodsItem>
      )
      )
    }
  </Fragment>
}

class GoodsList extends Component {
  render() {
    const { goodsList, getGoodsList } = this.props;
    return (
      <div className={styles['goods-container']}>
        {goodsList.length !== 0 ? <ProductList getGoodsList={getGoodsList} productlist={goodsList}></ProductList> : <NoProductInfo></NoProductInfo>}
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