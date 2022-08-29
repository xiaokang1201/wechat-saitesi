import useThrottle from "../../../hook/use-throttle"

// pages/pages-list/order-details/order-details.ts
const { api, tool, store } = getApp()
interface data {
  did: number,
  type: number,
  cartId: number | string,
  orderType: number,
  cartNumber: string,
  shippingType: number,
  beUseCoupon: {
    id?: number
  },
  orderKey: string,
  cartInfo: [] | CartInfo[],
  usableCoupon: [] | CouponInfo[],
  unUsableCoupon: [] | CouponInfo[],
  cancelUsableCouponIndex: number,
  coupon_price: string,
  payPrice: string,
  totalPrice: string,
  $state: {
    addressInfo: { id: number },
    vipDetail: {
      id?: number
    }
  },
  mark: string,
  shippingMobile: number | '',
  usableCouponIndex: number,
  pickupPoint: []
}
type ConfirmOrder = {
  pickup_point: []
  addressInfo: object,
  cartInfo: CartInfo[],
  unUsableCoupon: [] | CouponInfo[],
  usableCoupon: [] | CouponInfo[],
  orderKey: string,
  priceGroup: {
    costPrice: string,
    totalPrice: string,
    pay_price: number | string
  }
}
type CouponInfo = { id: number }
type CartInfo = { suk: string, sukList: string[] }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    did: 0,//分销员id
    type: 1,//1自采 2预约
    cartId: 0,//购物车id
    orderType: 0,//订单类型 默认0 未知 1 订单详情进入 2 购物车进入
    cartNumber: "",//orderType 1 订单进入 单个购物车数量
    shippingType: 0,//0 快递配送 1 门店自提
    beUseCoupon: {},//待使用优惠券 默认使用可用优惠券第一个
    orderKey: "",//临时缓存订单标识
    cartInfo: [],//订单商品列表
    pickupPoint: [],//门店列表
    usableCoupon: [],//可使用的优惠券
    unUsableCoupon: [],//不可使用优惠券
    usableCouponIndex: 0,//选中可使用的优惠券列表索引
    cancelUsableCouponIndex: -1,//选中可使用的优惠券列表 不选的值
    coupon_price: '0.00',//优惠券优惠金额
    payPrice: '0.00',//支付金额
    totalPrice: '0.00',//总金额
    mark: '',//备注
    shippingMobile: '',//自提手机号
  } as data,

  // 输入自提手机号
  shippingMobileChange({ detail: { value } }: Detail<string>) {
    console.log("1111")
    this.data.shippingMobile = Number(value)
  },

  // 输入备注
  markChange({ detail: { value } }: Detail<string>) {
    this.data.mark = value
  },

  // 点击立即支付
  paymentClick: useThrottle(function (this: any) {
    if(this.validationAddressInfo() !== true) return
    this.apiCreateOrder()
  }, 2000),

  // 校验是否填写收货信息
  validationAddressInfo() {
    if(this.data.shippingType === 1) {
      if(this.data.shippingMobile == '') {
        return tool.alert('请输入自提手机号!')
      }
    } else {
      if((!this.data?.$state.addressInfo || !this.data.$state.addressInfo.id)) {
        return tool.alert('请选择收货地址')
      }
    }
    return true
  },
  // 提交订单
  apiCreateOrder () {
    const { did, orderKey, mark, beUseCoupon: { id }, shippingType, type, shippingMobile } = this.data
    api.createOrder({
      shipping_type: shippingType + 1,
      shipping_id: shippingType === 1 ? 1 : '',
      type,
      did: did || 0, 
      order_key: orderKey,
      address_id: this.data.$state.addressInfo.id,
      mark,
      user_coupon_id: id || '',
      shipping_mobile: shippingMobile,
    }).then(({ data: { js_config } }: { data: { js_config: JsConfig } }) => {
      this.wxRequestPayment(js_config)
    })
  },

  // 调起微信支付
  wxRequestPayment(js_config: JsConfig) {
    // // 订单列表页面路径
    // const orderListPath = this.data.type === 1 
    // ? '/pages/pages-list/since-mining-order/since-mining-order'
    // : '/pages/pages-list/inspection-booking/inspection-booking'
    // 订单列表页面路径
    const orderListPath = '/pages/pages-list/since-mining-order/since-mining-order'
    const _this = this
    wx.requestPayment({
      timeStamp: js_config.timeStamp,
      nonceStr: js_config.nonceStr,
      package: js_config.package,
      signType: js_config.signType,
      paySign: js_config.paySign,
      success () { 
        const { type, shippingType } = _this.data
        tool.jump_red(`${orderListPath}?index=${type === 1 ? (shippingType === 1 ? 4 : 2) : 5}`)
      },
      fail () { 
        tool.jump_red(`${orderListPath}?index=1`)
      }
    })
  },

  // 点击进入地址列表选取地址
  getShippingAddressClick() {
    tool.jump_nav("/pages/pages-list/address-harvest/address-list/address-list")
  },

  // 点击切换配送类型
  tabClick({ currentTarget: { dataset: { index } } }: Index) {
    this.setData({ shippingType: index })
  },

  // 获取确认订单页面信息
  apiConfirmOrder(orderGoodsNumberChange = false, isApiOrderComputed = true) {
    return new Promise((resole, reject) => {
      getApp().api.confirmOrder({ 
        cart_id: this.data.cartId,
        is_vip: !!this.data.$state?.vipDetail.id ? 1 : 0
      })
      .then(({ data }: { data: ConfirmOrder }) => {
        data.priceGroup.pay_price = Number(data.priceGroup.pay_price).toFixed(2)
        // 订单商品数量变化不需要重置修改地址信息
        if(!orderGoodsNumberChange) store.setState({ addressInfo: data.addressInfo || {} })
        this.confirmOrderDataProcessing(data, isApiOrderComputed)
        resole(data)
      }).catch((data: object) => reject(data))
    })
  },

  // 获取确认订单页面信息
  apiConfirmOrders(isApiOrderComputed = true) {
    getApp().api.confirmOrders({ 
      cart_id: this.data.cartId, 
      is_vip: !!this.data.$state?.vipDetail.id ? 1 : 0
    }).then(({ data }: { data: ConfirmOrder }) => {
      data.priceGroup.pay_price = Number(data.priceGroup.pay_price).toFixed(2)
      getApp().store.setState({ addressInfo: data.addressInfo })
      this.confirmOrderDataProcessing(data, isApiOrderComputed)
    })
  },

  // 修改选中可使用的优惠券列表索引 detail -> usableCouponIndex
  switchUsableCouponIndex({ detail }: Body<number>) {
    this.setData({ usableCouponIndex: detail === this.data.usableCouponIndex 
      ? this.data.cancelUsableCouponIndex : detail })
  },

  // 切换优惠券点击确认 detail-> usableCouponIndex(选中可使用的优惠券列表索引)
  confirmCouponClick({ detail }: Body<number>) {
    if(detail === this.data.cancelUsableCouponIndex) {//取消选中
      if(this.data.orderType === 1) this.apiConfirmOrder(false, false)
      if(this.data.orderType === 2) this.apiConfirmOrders(false)
    } else {//选中使用
      this.apiOrderComputed(this.data.usableCoupon[detail].id, this.data.usableCoupon[detail])
    }
  },

  // 根据优惠券重新计算订单金额 优惠券id 优惠券信息
  apiOrderComputed(user_coupon_id: number, coupon_info: CouponInfo) {
    api.orderComputed({
      order_key: this.data.orderKey,
      user_coupon_id
    }).then(({ data: { pay_price, total_price, coupon_price } }: { data: Body<string> }) => {//总计 支付金额 优惠金额
      this.setData({
        coupon_price,
        beUseCoupon: coupon_info,
        payPrice: pay_price,
        totalPrice: total_price,
      })
    })
  },

  // 订单页面接口数据处理 type 1
  confirmOrderDataProcessing({ cartInfo, pickup_point, usableCoupon, unUsableCoupon, orderKey, priceGroup: 
    { totalPrice, pay_price, costPrice } }: ConfirmOrder, isApiOrderComputed: boolean) {
    this.data.orderKey = orderKey 
    for(const i of cartInfo) {
      i.sukList = i.suk.split(',')
    }
    this.setData({
      pickupPoint: pickup_point,
      cartInfo,
      usableCoupon,
      unUsableCoupon,
      payPrice: pay_price.toString(), 
      costPrice,
      totalPrice,
      couponsType: 0,
      usableCouponIndex: isApiOrderComputed ? 0 : this.data.cancelUsableCouponIndex,
    })
    // 判断存在可用优惠券默认用第一个
    if(usableCoupon.length>0&&isApiOrderComputed) {
      this.apiOrderComputed(usableCoupon[0].id, usableCoupon[0])
    } else {
      this.setData({ beUseCoupon: {} })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ type, cart_id, did }: Body<string>) {
    console.log('type, cart_id, did', type, cart_id, did)
    this.data.type = Number(type)
    this.setData({ type: Number(type) })
    this.data.cartId = cart_id
    // 判断用户从订单详情或者购物车进入区分请求不同接口
    const pages = getCurrentPages()
    const higherPage = pages[pages.length - 2]
    try {
      // switch('pages/pages-list/goods-details/goods-details') {
      if(higherPage.is === 'pages/pages-list/goods-details/goods-details') {//商品详情
        this.data.orderType = 1
        this.setData({ orderType: 1 })
        this.data.did = Number(did || 0)
        this.apiConfirmOrder()
      } else if (
        higherPage.is === 'pages/cart/cart' ||
        higherPage.is === 'pages/pages-list/since-mining-order-details/since-mining-order-details' || 
        higherPage.is ===  'pages/pages-list/since-mining-order/since-mining-order') {//购物车 订单列表
        this.data.orderType = 2
        this.setData({ orderType: 2 })
        this.apiConfirmOrders()
      } else {
        console.log("进入订单详情 default")
        console.log(higherPage.is)
      }
    } catch (error) {
      tool.jump_back()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})