// pages/pages-list/choose-goods/choose-goods.ts
interface data {
  orderDetail: OrderDetail,
  checkNum: number,
  orderSn: string
}

interface OrderDetail { 
  delivery_id: string,
  code: { 
    sukList: string[], 
    product_attr_unique: string,
    thumb: string,
    product_thumb: string,
    goods_name: string,
    product_name: string
    price: string,
    product_price: string,
    check: boolean,
  }[] 
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: {},//详情信息
    checkNum: 0,//选中个数
    orderSn: '',//订单编号
  } as data,

  // 提交
  submit() {
    if(this.data.checkNum === 0) return getApp().tool.alert('请勾选商品')
    this.data.orderDetail.code = this.checkOrder()
    getApp().tool.jump_nav(`/pages/pages-list/after-sales/after-sales?orderInfo=${JSON.stringify(this.data.orderDetail)}`)
  },

  // 返回选中订单
  checkOrder() {
    return this.data.orderDetail.code.filter(item => item.check)
  },

  // 点击全选
  allClick() {
    this.data.orderDetail.code.forEach(item => { 
      item.check = this.data.checkNum === this.data.orderDetail.code.length ? false : true 
    })
    this.setData({
      [`orderDetail.code`]: this.data.orderDetail.code
    })
    this.getCheckNum()
  },

  // 点击勾选
  checkClick({ currentTarget: { dataset: { index } } }: Index) {
    this.setData({ [`orderDetail.code[${index}].check`]: !this.data.orderDetail.code[index].check })
    this.getCheckNum()
  },

  // 获取选中数量
  getCheckNum() {
    this.setData({
      checkNum: this.checkOrder().length
    })
  },

  // 获取订单详情
  apiOrderDetail() {
    getApp().api.orderDetail({ order_sn: this.data.orderSn }).then(({ data }: { data: OrderDetail }) => {
      for(const i of data.code) {
        i.sukList = i.product_attr_unique.split(',')
        i.thumb = i.product_thumb
        i.goods_name = i.product_name
        i.price = i.product_price
      }
      this.setData({ 
        orderDetail: data,
        checkNum: 0
      })
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