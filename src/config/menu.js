import GoodsList from '@/component/Goods/goodsList'
import GoodsAdd from '@/component/Goods/goodsAdd'
import OrderList from '@/component/Order/Ordering'
import ApplyList from '@/component/Apply/applyList'
import ProcessedList from '@/component/Apply/processedList'
import CreateApply from '@/component/Apply/createApply'
import UserGoodsList from '@/component/Goods/userGoodsList'

export const routes = [
  {
    key: 'goods_info',
    iconType: 'shopping-cart',
    title: '物品信息',
    children: [{
      key: 'goods_list',
      path: '/management/goods_list',
      component: GoodsList,
      iconType: 'user',
      title: '物品列表',
    }, {
      key: 'goods_add',
      path: '/management/goods_add',
      component: GoodsAdd,
      iconType: 'user',
      title: '添加物品',
    }]
  }, {
    key: 'contract_info',
    iconType: 'file-done',
    title: '租赁及合同信息',
    children: [{
      key: 'rent_list',
      path: '/management/rent_list',
      component: OrderList,
      iconType: 'laptop',
      title: '订单列表',
    }]
  }, {
    key: 'apply_list',
    iconType: 'cloud-upload',
    title: '后台服务中心',
    children: [{
      key: 'apply_rent',
      path: '/management/apply_list',
      component: ApplyList,
      iconType: 'notification',
      title: '申请列表',
    }, {
      key: 'apply_processed',
      path: '/management/apply_processed',
      component: ProcessedList,
      iconType: 'notification',
      title: '已处理',
    }]
  }
];

export const commonRoutes = [
  {
    key: 'goods_info',
    iconType: 'shopping-cart',
    title: '物品信息',
    children: [{
      key: 'goods_list',
      path: '/management/goods_list',
      component: UserGoodsList,
      iconType: 'user',
      title: '物品列表',
    }]
  }, {
    key: 'contract_info',
    iconType: 'file-done',
    title: '租赁信息',
    children: [{
      key: 'rent_list',
      path: '/management/rent_list',
      component: OrderList,
      iconType: 'laptop',
      title: '我的订单',
    }]
  }, {
    key: 'apply_list',
    iconType: 'cloud-upload',
    title: '服务中心',
    children: [{
      key: 'create_apply',
      path: '/management/create_apply',
      component: CreateApply,
      iconType: 'notification',
      title: '创建申请',
    }, {
      key: 'own_apply_list',
      path: '/management/own_apply_list',
      component: ApplyList,
      iconType: 'notification',
      title: '我的申请',
    }]
  }
];