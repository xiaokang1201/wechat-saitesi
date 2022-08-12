// pages/pages-list/inspection-booking-order-details/inspection-booking-order-details.ts
import useThrottle from "../../../hook/use-throttle"

interface data {
  orderSn: string,
  typeIndex: number,
  orderDetail: OrderDetail,
  status: number,
  statusList: { text: string }[],
  code_id: number
}

interface OrderDetail { 
  cartInfo: { suk: string, sukList: string[] }[] 
  booking_status: number,
  booking_text: string
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code_id: 0,//
    statusList: [
      { text: '等待买家付款' },
      { text: '待预约' },
      { text: '待采样' },
      { text: '检验中' },
      { text: '已过期' },
      { text: '已完成' },
      { text: '售后' },
    ],
    status: 0,
    typeIndex: 0,
    orderSn: '',
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

  // 复制订单号
  copyOrderSn(){
    wx.setClipboardData({ data: this.data.orderSn })
  },

  // 查询条码状态
  apiGetOrderCode(code: string) {
    type getOrderCode = { data: { booking_status: number, booking_text: string } }
    getApp().api.getOrderCode({ code }).then(({ data: { booking_status, booking_text } }: getOrderCode) => {
      this.setData({ status: booking_status + 1, booking_text })
    })
  },

  // 获取订单详情
  apiOrderDetail() {
    getApp().api.orderDetail({ order_sn: this.data.orderSn }).then(({ data }: { data: OrderDetail }) => {
      // 登记预约 待支付 都没有 code 
      for(const i of data.cartInfo) {
        i.sukList = i.suk.split(',')
      }
      this.setData({ orderDetail: data })
    })
  },
  
  // 点击申请售后
  applyAfterSalesClick() {
    getApp().tool.jump_nav(`/pages/pages-list/after-sales/after-sales`)
  },

  // 点击去评论
  evaluationOrderClick() {
    getApp().tool.jump_nav(`/pages/pages-list/evaluation/evaluation?cartInfo=${
      JSON.stringify(this.data.orderDetail.cartInfo[0])}`)
  },
  
  // 跳转登记预约
  goBookingInspection() {
    getApp().tool.jump_nav(`/pages/pages-list/booking-inspection/booking-inspection?code=${this.data.code_id}`)
  },

  // 预约详情
  apiBookingDetail() {
    getApp().api.bookingDetail({ code_id: this.data.code_id }).then(({ data }: { data: OrderDetail }) => {
      for(const i of data.cartInfo) {
        i.sukList = i.suk.split(',')
      }
      this.setData({ 
        orderDetail: data,
        status: data.booking_status+1,
        booking_text: data.booking_text
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ order_sn, code, code_id }: Body<string>) {
    this.data.code_id = Number(code_id)
    this.data.orderSn = order_sn
    // this.apiOrderDetail()
    // this.apiGetOrderCode(code)
    this.apiBookingDetail()
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