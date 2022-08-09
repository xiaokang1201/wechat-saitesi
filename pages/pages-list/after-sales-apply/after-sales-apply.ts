import useThrottle from "../../../hook/use-throttle"

// pages/pages-list/after-sales-apply/after-sales-apply.ts
type form = {
  list: { check: boolean, name: string, id: number }[], 
  name: string,
  index: number,
  id: number
}[]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 2 as number,//1退款 2退款退货
    form: [
      {
        name: '货物状态',
        index: -1,
        id: 1,
        list: [
          { name: '未收到货', id: 1 },
          { name: '已收到货', id: 2 },
        ]
      },
      {
        name: '退款原因',
        index: -1,
        id: 2,
        list: [
          { name: '不喜欢/不想要', id: 1 },
          { name: '空包裹', id: 2 },
          { name: '未按约定时间发货', id: 3 },
          { name: '快递/物流无跟踪记录', id: 4 },
          { name: '货物破损拒签', id: 5 },
        ]
      }
    ] as form,//选择退款货物状态原因
    chooseIndex: 0,//选择索引 0 关闭 1 货物状态 2 退款原因
    freightPrice: '',//退款金额
    orderSn: '',//订单编号
    refundReasonWapExplain: '',//退款描述
    refundReasonWap: '',//退款原因
    refundReasonWapImg: '',//图片
  },
  // 上传凭证
  uploadImg({ detail }: Body<string>) {
    this.data.refundReasonWapImg = detail
  },
  // 输入退款描述
  textareaChange({ detail }: Body<string>) {
    this.setData({ refundReasonWapExplain: detail })
  },
  // 选择原因
  popItemClick({ currentTarget: { dataset: { index } } }: Index) {
    this.setData({
      [`form[${this.data.chooseIndex-1}].index`]: index
    })
    this.hiddenPop()
  },

  // 关闭弹框
  hiddenPop() {
    this.setData({ chooseIndex: 0 })
  },

  // 点击选择
  chooseClick({ currentTarget: { dataset: { index } } }: Index) {
    this.setData({ chooseIndex: index+1 })
  },

  // 点击申请退款 
  afterSalesClick: useThrottle(async function (this: any) {
    await this.apiOrderRefund()
    await getApp().tool.alert("退款申请成功", 1000, 1)
    this.hiddenPop()
    getApp().tool.jump_back()
  }),

  // 申请退款
  apiOrderRefund() {
    const { orderSn, form, refundReasonWapExplain, refundReasonWapImg } = this.data
    
    return getApp().api.orderRefund({
      order_sn: orderSn,
      refund_reason_wap: form[1].list[form[1].index].name,
      refund_reason_wap_explain: refundReasonWapExplain,
      refund_reason_wap_img: refundReasonWapImg,
      status: form[1].list[form[1].index].id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const pages = getCurrentPages(); //页面对象
    const prevpage = pages[pages.length - 2]; //上一个页面对象
    const { data: { orderSn, orderDetail: { freight_price } } } = pages[pages.length - 3]; //上上一个页面对象
    this.setData({ 
      cartInfo: prevpage.data.cartInfo,
      freightPrice: freight_price,
      orderSn, 
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