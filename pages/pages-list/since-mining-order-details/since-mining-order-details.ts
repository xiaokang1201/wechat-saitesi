// pages/pages-list/since-mining-order-details/since-mining-order-details.ts
import useThrottle from "../../../hook/use-throttle"
import wxOpenLocation from "../../../private/wx-open-location"
import api from "../../../utils/api/api"
interface data {
  orderSn: string,
  status: number,
  // statusList: { text: string }[],
  orderDetail: OrderDetail,
  logisticsInfo: [] | {}[],
  recommendGoodsList: [] | {}[],
  show: boolean,
  $state: {
    userConfig: {
      custom_mobile: ''
    }
  }
}

interface OrderDetail { 
  delivery_id: string,
  order_id: string,
  code: { 
    cart_num: number,
    sukList: string[], 
    product_attr_unique: string,
    thumb: string,
    product_thumb: string,
    goods_name: string,
    product_name: string
    price: string,
    product_price: string,
    check: boolean,
    code_id: number
  }[] 
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderSn: '',
    // statusList: [
    //   { text: '等待买家付款' },
    //   { text: '待商家发货' },
    //   { text: '待收货' },
    //   { text: '已完成' },
    //   { text: '售后' },
    //   { text: '待商家备货' },
    // ],
    status: 0,
    orderDetail: {},
    logisticsInfo: [],
    recommendGoodsList: [],
    show: false
  } as data,
  // 点击列表项
  itemClick({ currentTarget: { dataset: { goods_id } } }: CurrentTarget<number>) {
    getApp().tool.jump_nav(`/pages/pages-list/goods-details/goods-details?goods_id=${goods_id}`)
    // this.triggerEvent('itemClick', id)
  },

  //#region 预约订单
  // 跳转登记预约
  goBookingInspection({ currentTarget: { dataset: { code_id } } }: CurrentTarget<number>) {
    getApp().tool.jump_nav(`/pages/pages-list/booking-inspection/booking-inspection?code=${code_id}`)
  },
  // 点击扫码绑定
  scanBindClick({ currentTarget: { dataset: { code_id, product_name } } }: CurrentTarget<number>) {
    getApp().tool.jump_nav(`/pages/pages-list/scan-bind/scan-bind?code_id=${code_id}&product_name=${product_name}&order_sn=${this.data.orderDetail.order_id}`)
  },
  // 点击查看报告
  lookReportClick({ currentTarget: { dataset: { url } } }: CurrentTarget<string>) {
    this.filePreview(url)
  },
  // 点击寄回
  sendBack({ currentTarget: { dataset: { code_id, index } } }: CurrentTarget<number>) {
    getApp().tool.jump_nav(`/pages/pages-list/sample-sent-back-order/sample-sent-back-order?code_ids=${code_id}&goods=${JSON.stringify([this.data.orderDetail.code[index]])}`)
  },
  // 文件预览
  filePreview(url: string) {
    getApp().tool.loading()
    wx.downloadFile({//下载对应文件
      url, // 下载文件网络地址
      success(res) {   
        wx.openDocument({
          filePath: res.tempFilePath,// 装载对应文件的路径
          showMenu: true,// 右上角的菜单转发分享操作
          complete() {
            getApp().tool.loading_h()
          }
        })
      }
    })
  },
  //#endregion
  
  // 申请发票
  applyNote() {
    getApp().tool.jump_nav(`/pages/pages-list/apply-note/apply-note?order_sn=${this.data.orderSn}`)
  },
  
  // 点击确认收货
  confirmOrderClick: useThrottle(async function (this: any) {
    await this.apiOrderSure()
    await getApp().tool.alert("成功收货", 1000, 1)
    this.apiOrderDetail()
  }),

  // 确认收货
  apiOrderSure() {
    return getApp().api.orderSure({ order_sn: this.data.orderSn })
  },

  // 查看物流
  lookLogistics: useThrottle(function (this: any) {
    this.getExpressInfo()
  }),

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

  // 导航
  navigation() {
    wxOpenLocation()
  },

  // 关闭弹框
  shutDownPop() {
    this.setData({ show: false })
  },
  
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

  // 单个商品申请售后
  applyAfterSalesItemClick({ currentTarget: { dataset: { index } } }: Index) {
    this.data.orderDetail.code = [this.data.orderDetail.code[index]]
    getApp().tool.jump_nav(`/pages/pages-list/after-sales/after-sales?orderInfo=${JSON.stringify(this.data.orderDetail)}`)
  },

  // 点击申请售后
  applyAfterSalesClick() {
    getApp().tool.jump_nav(`/pages/pages-list/after-sales/after-sales?orderInfo=${JSON.stringify(this.data.orderDetail)}`)
  },

  // 点击去评论
  evaluationOrderClick({ currentTarget: { dataset: { index } } }: Index) {
    getApp().tool.jump_nav(`/pages/pages-list/evaluation/evaluation?cartInfo=${
      JSON.stringify(this.data.orderDetail.code[index])}`)
  },

  // 拨打电话
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.$state.userConfig.custom_mobile
    })
  },

  // 复制订单号
  copyOrderSn(){
    wx.setClipboardData({ data: this.data.orderSn })
  },

  // 获取订单详情
  apiOrderDetail() {
    getApp().api.orderDetail({ order_sn: this.data.orderSn }).then(({ data }: { data: OrderDetail }) => {
      for(const i of data.code) {
        i.sukList = i.product_attr_unique.split(',')
        i.thumb = i.product_thumb
        i.goods_name = i.product_name
        i.price = i.product_price
        i.cart_num = 1
      }
      this.setData({ orderDetail: data })
    })
  },

  // 推荐产品列表
  apiRecommendGoods() {
    api.recommendGoods().then(({ data }: Body<[]>) => {
      this.setData({ recommendGoodsList: data })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ order_sn }: Body<string>) {
    this.data.orderSn = order_sn
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
    this.apiOrderDetail()
    this.apiRecommendGoods()
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