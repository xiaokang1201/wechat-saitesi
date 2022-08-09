import useThrottle from "../../../hook/use-throttle"

// pages/pages-list/since-mining-order-details/since-mining-order-details.ts
interface data {
  orderSn: string,
  status: number,
  statusList: { text: string }[],
  orderDetail: OrderDetail
}

interface OrderDetail { 
  cartInfo: { suk: string, sukList: string[] }[] 
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderSn: '',
    statusList: [
      { text: '等待买家付款' },
      { text: '待商家发货' },
      { text: '待收货' },
      { text: '已完成' },
      { text: '售后' },
      { text: '待商家备货' },
    ],
    status: 0,
    orderDetail: {}
  } as data,

  // 订单支付
  apiOrderPay: useThrottle(function (this: any) {
    type orderPay = { data: { js_config: JsConfig } }
    getApp().api.orderPay({ order_sn: this.data.orderSn }).then(({ data: { js_config } }: orderPay) => {
      wx.requestPayment({
        timeStamp: js_config.timeStamp,
        nonceStr: js_config.nonceStr,
        package: js_config.package,
        signType: js_config.signType,
        paySign: js_config.paySign,
        success () { 
          getApp().tool.alert("支付成功", 1000, 1)
        },
        complete() {
          getApp().tool.jump_back()
        },
      })
    })
  }),
  
  // 点击再来一单
  anotherList: useThrottle(function (this: any) {
    const { orderSn, orderDetail: { type } } = this.data 
    getApp().api.moreOrder({ order_sn: orderSn }).then(({ data }: Body<string[]>) => {
      getApp().tool.jump_nav(`/pages/pages-list/order-details/order-details?cart_id=${data.join(',')}&type=${type}`)
    })
  }),

  // 点击申请售后
  applyAfterSalesClick() {
    getApp().tool.jump_nav(`/pages/pages-list/after-sales/after-sales`)
  },

  // 点击去评论
  evaluationOrderClick() {
    getApp().tool.jump_nav(`/pages/pages-list/evaluation/evaluation?cartInfo=${
      JSON.stringify(this.data.orderDetail.cartInfo[0])}`)
  },

  // 拨打电话
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: ''
    })
  },

  // 复制订单号
  copyOrderSn(){
    wx.setClipboardData({ data: this.data.orderSn })
  },

  // 获取订单详情
  apiOrderDetail() {
    getApp().api.orderDetail({ order_sn: this.data.orderSn }).then(({ data }: { data: OrderDetail }) => {
      for(const i of data.cartInfo) {
        i.sukList = i.suk.split(',')
      }
      this.setData({ orderDetail: data })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ order_sn }: Body<string>) {
    this.data.orderSn = order_sn
    this.apiOrderDetail()
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