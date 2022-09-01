// pages/pages-list/since-mining-order/since-mining-order.ts
import useLoadMore from "../../../hook/use-load-more"
import useLoadMoreJudge from "../../../hook/use-load-more-judge"
import useThrottle from "../../../hook/use-throttle"
import apiUserDetail from "../../../private/api-user-detail"
interface data extends List, $State {
  typeIndex: number, 
  statusList: number[] | string[], 
  search: string,
  time: number,
  timer: number,
  orderDetail: OrderDetail
}

interface OrderDetail {
  order_id: string,
  delivery_id: string
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: ['全部', '待支付', '待发货', '待收货', '待自提', '待评价', '售后'],//类型列表
    statusList: ['', 0, 1, 2, 3, 4, 6],//状态列表
    typeIndex: 0,//类型索引
    search: '',//订单号搜索
    page: 0,//页码
    list: [],//列表
    loadMoreType: 1,//列表加载状态
    time: 0,//停留时间
    timer: 0,//定时器
    show: false,//物流信息
    orderDetail: {
      order_id: '',
      delivery_id: ''
    },//单个订单详情
    publicNoShow: false//公众号弹框
  } as data,
  // 点击遮罩层关闭弹框
  clickoverlay() {
    this.setData({ publicNoShow: false })
  },
  // 空函数
  empty() {
    return
  },

  // 查看物流
  lookLogistics: useThrottle(function (this: any, { currentTarget: { dataset: { item } } }: CurrentTarget<{}>) {
    this.data.orderDetail = item
    this.setData({ orderDetail: item })
    this.getExpressInfo()
  }),

  // 拨打电话
  makePhoneCall() {
    const phoneNumber: string | undefined = this.data.$state?.userConfig?.custom_mobile
    if(typeof phoneNumber  === 'string') {
      wx.makePhoneCall({
        phoneNumber
      })
    }
  },

  // 复制订单号
  copyOrderSn(){
    wx.setClipboardData({ data: this.data.orderDetail.order_id })
  },

  // 关闭弹框
  shutDownPop() {
    this.setData({ show: false })
  },

  // 获取物流信息
  getExpressInfo() {
    getApp().api.getExpressInfo({
      kuaidinum: this.data.orderDetail.delivery_id
    }).then(({ data }: Body<{}[]>) => {
      this.setData({ 
        logisticsInfo: data,
        show: true 
      })
    })
  },

  // 点击再来一单
  anotherList: useThrottle(function (this: any, { currentTarget: { dataset: { item } } }: CurrentTarget<{ order_id: string, cartInfo: {type: number}[] }>) {
    const { order_id, cartInfo } = item
    getApp().api.moreOrder({ order_sn: order_id }).then(({ data }: Body<string[]>) => {
      getApp().tool.jump_nav(`/pages/pages-list/order-details/order-details?cart_id=${data.join(',')}&type=${cartInfo[0].type}`)
    })
  }),

  // 点击申请售后
  applyAfterSalesClick({ currentTarget: { dataset: { order_sn } } }: CurrentTarget<string>) {
    getApp().tool.jump_nav(`/pages/pages-list/choose-goods/choose-goods?order_sn=${order_sn}`)
  },

  // 点击单个订单，进入订单详情
  itemClick({ currentTarget: { dataset: { order_sn } } }: CurrentTarget<string>) {
    getApp().tool.jump_nav(`/pages/pages-list/since-mining-order-details/since-mining-order-details?order_sn=${order_sn}`)
  },

  // 点击搜索 detail -> inputValue
  inputConfirm: useThrottle(function (this: { data: { search: string }, initCurrentOrderList: ()=>{} }, 
  { detail }: Body<string>) {
    this.data.search = detail
    this.initCurrentOrderList()
  }),

  //点击切换订单类型
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
    this.apiOrderList()
  },

  //#region 订单操作按钮点击事件
  // 点击取消订单
  cancelOrderClick: useThrottle(async function ( this: any, { currentTarget: { dataset: { order_sn } } }: CurrentTarget<string>) {
    await this.apiCancerOrder(order_sn)
    getApp().tool.alert("取消成功", 1000, 1)
    this.initCurrentOrderList()
  }),
  // 点击立即付款
  payOrderClick: useThrottle(function (this: any, { currentTarget: { dataset: { order_sn } } }: CurrentTarget<string>) {
    this.apiOrderPay(order_sn)
  }),
  // 点击确认收货
  confirmOrderClick: useThrottle(async function (this: any, { currentTarget: { dataset: { order_sn } } }: CurrentTarget<string>) {
    await this.apiOrderSure(order_sn)
    getApp().tool.alert("成功收货", 1000, 1)
    // this.initCurrentOrderList()
    this.data.typeIndex = 5
    this.setData({ typeIndex: 5 })
    this.initCurrentOrderList()
  }),
  //#endregion

  //#region API
  // 确认收货
  apiOrderSure(order_sn: string) {
    return getApp().api.orderSure({ order_sn })
  },
  // 取消订单
  apiCancerOrder(order_sn: string) {
    return getApp().api.cancerOrder({ order_sn })
  },
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
  // 初始化定时器
  initTimer() {
    clearInterval(this.data.timer)
    this.data.timer = setInterval(() => {
      this.setData({
        time: this.data.time+1
      })
    }, 1000)
  },
  // 自采订单列表
  apiOrderList() {
    if(useLoadMoreJudge(this)) return
    const { typeIndex, statusList, search } = this.data
    const page = this.data.page + 1
    getApp().api.orderList({ page, status: statusList[typeIndex], search }).then(({ data }: Body<[]>) => {
      this.setData({
        list: page === 1 ? data : this.data.list.concat(data),
        page,
        loadMoreType: useLoadMore(data, page, this.data.$state?.limit)
      })
      this.initTimer()
    })
  },
  //#endregion
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ index }) {
    const typeIndex = Number(index) || 0
    this.data.typeIndex = typeIndex
    this.setData({ typeIndex })
    apiUserDetail().then(() => {
      const pages = getCurrentPages()
      const prvepage = pages[pages.length - 2];
      if((prvepage.is === 'pages/pages-list/web-view/web-view' 
        || prvepage.is === 'pages/pages-list/goods-details/goods-details') 
        && this.data.$state.userInfo.subscribe === 0) {
        this.setData({ publicNoShow: true })
      }
    })
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
    this.apiOrderList()
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