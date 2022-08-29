import useThrottle from "../../../hook/use-throttle"

// pages/pages-list/apply-note/apply-note.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_sn: '', //订单编号
    noteTypeList: ['增值税专用发票', '普通发票', '专用发票'],//发票类型列表
    noteTypeIndex: 0,//发票类型 invoice_type
    title_type: '个人或事业单位',//抬头类型    
    title: '',//抬头   
    codes: '',//税号   
    bank_type: '',//开户行   
    bank_no: '',//卡号   
    address: '',//地址   
    phone: '',//联系方式  
    invoice_email: '',//邮箱  
  },

  // 点击选择抬头类型
  titleTypeClick({ currentTarget: { dataset: { text } } }: CurrentTarget<string>) {
    this.setData({ title_type: text })
  },

  // 勾选发票类型列表
  noteTypeChange({ detail: { value } }: Detail<string>) {
    this.setData({ noteTypeIndex: Number(value) })
  },

  // 申请发票
  apiOrderInvoice: useThrottle(function (this: any) {
    const { order_sn, noteTypeList, noteTypeIndex, title_type, title, codes, bank_type, bank_no, address, phone, invoice_email } = this.data
    getApp().api.orderInvoice({
      order_sn, //订单编号
      invoice_type: noteTypeList[noteTypeIndex],
      title_type,   
      title,
      codes,
      bank_type, 
      bank_no,
      address,
      phone,
      invoice_email, 
    }).then(async () => {
      await getApp().tool.alert('提交完成', 1000 ,1)
      getApp().tool.jump_back()
    })
  }),

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ order_sn }: Body<string>) {
    this.data.order_sn = order_sn
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