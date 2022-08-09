/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    audioBack?: {
      init: Function,
      play: Function,
      pause: Function,
    }
  }
  store: {
    setState: Function,
    getState: Function
  },
  api?: {},
  tool?: {},
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
// 弹框显示隐藏
interface PopShowHiddn { 
  currentTarget: {
    dataset: {
      field: string,
      show: boolean
    }
  }
}
interface GetUserInfoCallback {detail: { status: boolean } }//用户信息授权
interface swiperChange { detail: { current: number } }//轮播
interface Index { currentTarget: { dataset: { index: number } } }//索引
interface List {
  page: number,
  loadMoreType: number,
  list: [] | object[]
}//列表
interface $State { 
  $state?: { 
    limit: 10, 
    userInfo?: { did: number, default_address_id: number }
    userConfig?: { custom_mobile: string }
  } 
}//页码
// 目标字段类型定义
interface CurrentTarget<T> {
  currentTarget: {
    dataset: {
      [propName: string]: T
    }
  }
}
// 数据详情类型定义
interface Detail<T> {
  detail: {
    [propName: string]: T,
  }
}

// 目标字段类型定义 数据详情类型定义
interface CurrentTargetDetail<T,B> {
  currentTarget: {
    dataset: {
      [propName: string]: T
    }
  }
  detail: {
    [propName: string]: B,
  }
}
// 单个对象字段自定义类型
interface Body<T> {
  [propName: string]: T
}
// 支付参数
interface JsConfig {
  timeStamp: string,
  nonceStr: string,
  package: string,
  signType: 'MD5',
  paySign: string,
}

interface GoodsList {
  browse: number,
  goods_id: number
  image: string,
  price: string
  sales: number
  stock: number
  store_info: string
  store_name: string
  type: number
  unit_name: string
}