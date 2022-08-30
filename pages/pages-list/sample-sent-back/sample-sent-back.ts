// pages/pages-list/sample-sent-back/sample-sent-back.ts
import useLoadMore from "../../../hook/use-load-more"
import useThrottle from "../../../hook/use-throttle"
import api from "../../../utils/api/api"

interface data extends List {
  list: {
    check: Boolean,
    code_id: number,
  }[],
  orderSn: string,
  typeIndex: number,
  checkNum: number
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderSn: '',//订单编号
    typeList: ['待寄回', '已寄出'],//类型列表
    typeIndex: 0,//类型列表索引
    list: [],//列表
    loadMoreType: 1,//列表加载状态
    page: 0,//页码
    show: false,//物流弹框显示隐藏
    logisticsInfo: [],
    checkNum: 0,//勾选数量
  } as data,

  // 查看物流
  lookLogistics: useThrottle(function (this: any, { currentTarget: { dataset: { kuaidinum } } }: CurrentTarget<string>) {
    this.getExpressInfo(kuaidinum)
  }),

  // 获取物流信息
  getExpressInfo(kuaidinum: string) {
    getApp().api.getExpressInfo({
      kuaidinum
    }).then(({ data }: Body<{}[]>) => {
      this.setData({ 
        logisticsInfo: data,
        show: true 
      })
    })
  },


  // 点击寄回
  sendBack({ currentTarget: { dataset: { code_ids } } }: CurrentTarget<string>) {
    getApp().tool.jump_nav(`/pages/pages-list/sample-sent-back-order/sample-sent-back-order?code_ids=${code_ids}`)
  },

  // 提交登记预约
  submit() {
    if(this.data.checkNum === 0) return getApp().tool.alert('请勾选订单')
    const code_ids = this.checkList().map(item => item.code_id).join(',')
    getApp().tool.jump_nav(`/pages/pages-list/sample-sent-back-order/sample-sent-back-order?code_ids=${code_ids}&goods=${JSON.stringify(this.checkList())}`)
  },

  // 点击全选
  allClick() {
    this.data.list.forEach(item => { 
      item.check = this.data.checkNum !== this.data.list.length
    })
    this.setData({ list: this.data.list })
    this.getCheckNum()
  },

  // 勾选
  itemCheckClick({ currentTarget: { dataset: { index } } }: Index) {
    this.setData({ [`list[${index}].check`]: !this.data.list[index].check })
    this.getCheckNum()
  },

  // 计算当前勾选数量
  getCheckNum() {
    this.setData({
      checkNum: this.checkList().length
    })
  },

  // 返回勾选列表
  checkList() {
    return this.data.list.filter(item => item.check)
  },

  // 输入搜索
  inputConfirm({ detail }: Body<string>) {
    this.data.orderSn = detail
    this.refresh()
    this.myCodes()
  },

  // 关闭弹框
  shutDownPop() {
    this.setData({ show: false })
  },

  // 刷新列表状态
  refresh() {
    this.data.loadMoreType = 1
    this.data.list = []
    this.setData({ 
      list: [],
      loadMoreType: 1
    })
  },

  // 点击类型项
  typeItemClick({ detail }: { detail: number }) {
    if(this.data.typeIndex === detail) return
    this.refresh()
    this.data.typeIndex = detail
    this.setData({ typeIndex: detail })
    this.myCodes()
  },

  // 获取条码
  myCodes() {
    const { typeIndex, orderSn } = this.data
    api.myCodes({
      status: typeIndex + 1,
      order_sn: orderSn
    }).then(({ data }: Body<[]>) => {
      this.setData({ 
        loadMoreType: useLoadMore(data, false),
        list: data 
      })
      this.getCheckNum()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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
    this.myCodes()
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