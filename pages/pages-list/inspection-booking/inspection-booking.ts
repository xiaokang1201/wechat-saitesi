// pages/pages-list/inspection-booking/inspection-booking.ts
import useLoadMore from "../../../hook/use-load-more"
import useLoadMoreJudge from "../../../hook/use-load-more-judge"
import useThrottle from "../../../hook/use-throttle"

interface data extends $State {
  typeList: string[],
  typeIndex: number,
  actionBtnList: string[],
  statusList: number[] | string[],
  search: string,
  list: _list[],
  checkNum: number,
  loadMoreType: number,
  page: number
}

interface _list {
  check: boolean, code: string, sukList: string[], product_attr_unique: string
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: ['全部', '待支付', '登记预约', '待采样', '检验中', '已过期', '已完成', '售后'],//类型列表
    statusList: ['', -1, 0, 1, 2, 3, 4, 5],//状态列表
    // -1待付款 0待预约 1待检验 2检验中 3已过期 4已完成  
    typeIndex: 0,//类型列表索引
    actionBtnList: ['登记信息', '扫码绑定', '登记预约', '重新预约', '查看报告', '申请退款'],
    search: '',//关键词
    page: 0,//页码
    list: [],//列表
    loadMoreType: 1,//列表加载状态
    checkNum: 0,//选中数量
    // CA22MEJK07012
  } as data,

  // 提交登记预约
  submit() {
    if(this.data.checkNum === 0) return getApp().tool.alert('请勾选订单')
    const code = this.checkOrder().map(item => item.code).join(',')
    this.goBookingInspection(code)
  },
  
  // 点击扫码绑定
  scanBindClick() {
    getApp().tool.jump_nav(`/pages/pages-list/scan-bind/scan-bind`)
  },

  // 点击登记预约
  bookingInspectionClick({ currentTarget: { dataset: { code } } }: CurrentTarget<string>) {
    this.goBookingInspection(code)
  },

  // 跳转登记预约
  goBookingInspection(code: string) {
    getApp().tool.jump_nav(`/pages/pages-list/booking-inspection/booking-inspection?code=${code}`)
  },

  // 点击全选
  allClick() {
    this.data.list.forEach(item => { 
      item.check = this.data.checkNum === this.data.list.length ? false : true 
    })
    this.setData({
      list: this.data.list
    })
    this.getCheckNum()
  },

  // 点击勾选
  checkClick({ currentTarget: { dataset: { index } } }: Index) {
    this.setData({ [`list[${index}].check`]: !this.data.list[index].check })
    this.getCheckNum()
  },

  // 获取选中数量
  getCheckNum() {
    this.setData({
      checkNum: this.checkOrder().length
    })
  },

  // 返回选中订单
  checkOrder() {
    return this.data.list.filter(item => item.check)
  },

  // 点击取消订单
  cancelOrderClick: useThrottle(async function ( this: any, { currentTarget: { dataset: { order_sn } } }: CurrentTarget<string>) {
    await this.apiCancerOrder(order_sn)
    getApp().tool.alert("取消成功", 1000, 1)
    this.initCurrentOrderList()
  }),
  
  // 取消订单
  apiCancerOrder(order_sn: string) {
    return getApp().api.cancerOrder({ order_sn })
  },

  // 点击立即付款
  payOrderClick: useThrottle(function (this: any, { currentTarget: { dataset: { order_sn } } }: CurrentTarget<string>) {
    this.apiOrderPay(order_sn)
  }),

  // 订单支付
  apiOrderPay(order_sn: string) {
    const _this = this
    type orderPay = { data: { js_config: JsConfig } }
    getApp().api.orderPay({ order_sn }).then(({ data: { js_config } }: orderPay) => {
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
          _this.initCurrentOrderList()
        },
      })
    })
  },

  // 点击单个订单，进入订单详情
  goDetails({ currentTarget: { dataset: { order_sn, code } } }: CurrentTarget<string>) {
    getApp().tool.jump_nav(`/pages/pages-list/inspection-booking-order-details/inspection-booking-order-details?order_sn=${order_sn}&code=${code}`)
  },

  // 点击类型项
  typeItemClick({ detail }: Body<number>) {
    if(this.data.typeIndex === detail) return
    this.data.typeIndex = detail
    this.setData({ typeIndex: detail })
    this.initCurrentOrderList()
  },

  // 当前状态列表初始化
  initCurrentOrderList() {
    this.data.page = 0
    this.data.loadMoreType = 1
    this.data.list = []
    this.setData({ 
      loadMoreType: 1,
      list: [] 
    })
    this.apiBookingList()
  },

  // 获取预约列表
  apiBookingList() {
    if(useLoadMoreJudge(this)) return
    const { typeIndex, statusList, search } = this.data
    const page = this.data.page + 1
    getApp().api.bookingList({ page, status: statusList[typeIndex], search }).then(({ data }: Body<_list[]>) => {
      for(const i of data) {
        i.sukList = i.product_attr_unique.split(',')
      }
      this.setData({
        list: page === 1 ? data : this.data.list.concat(data),
        page,
        loadMoreType: useLoadMore(data, page, this.data.$state?.limit)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ index }: Body<string>) {
    const typeIndex = Number(index) || 0
    this.data.typeIndex = typeIndex
    this.setData({ typeIndex })
    this.apiBookingList()
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