// pages/pages-list/scan-bind/scan-bind.ts
import Validator from '../../../class/validator'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderSn: '',//订单编号
    productName: '',//商品名称
    codeId: '',//条码编号
    code_id: 0,//条码id  
    personAddressId: 0,//受检人地址id  
    diseases: '',//现有疾病  
    history: '',//用药史  
    familyHistory: '',//家族病史  
    codeTime: '',//检测日  
    isAgree: false,//是否同意条款
    name: '',//姓名
    cardType: '',//证件类型
    cardNo: '',//身份证号码
    mobile: '',// 手机
  },

  // 输入框搜索
  inputConfirm() {
    this.apiGetOrderCode()
  },

  // 点击扫码
  scanCode() {
    const _this = this
    wx.scanCode({
      scanType: ['barCode'],
      success({ result }) {
        _this.setData({ codeId: result })
        _this.data.codeId = result
        _this.apiGetOrderCode()
      }
    })
  },

  // 选择收件人
  goExaminate() {
    getApp().tool.jump_nav(`/pages/pages-list/examinate/examinate`)
  },

  // 选择采样日期
  codeTimeChange({ detail: { value } }: Detail<string>) {
    this.setData({ codeTime: value })
  },

  // 点击勾选协议
  agreeClick() {
    this.setData({ isAgree: !this.data.isAgree })
  },

  // 提交
  async submit() {
    const { isEmpty } = new Validator()
    const { code_id, isAgree, diseases, history, familyHistory, codeTime } = this.data
    if(!isAgree) return getApp().tool.alert('请勾选协议')
    if(code_id === 0) return getApp().tool.alert('请扫描或者输入条码查询')
    if(!isEmpty(codeTime, '请选择采样时间')
      &&!isEmpty(diseases, '请输入现有疾病')
      &&!isEmpty(history, '请输入用药史')
      &&!isEmpty(familyHistory, '请输入家族病史 ')) {
      await this.apiHandleOrderCode()
      await getApp().tool.alert('绑定成功')
      getApp().tool.jump_back()
    }
  },

  // 查询条码状态
  apiGetOrderCode() {
    type getOrderCode = { data: { order_sn: string, product_name: string, code_id: number } }
    getApp().api.getOrderCode({ code: this.data.codeId }).then(({ data: { order_sn, product_name, code_id } }: getOrderCode) => {
      this.setData({ orderSn: order_sn, productName: product_name, code_id })
    })
  },

  // 提交条码
  apiHandleOrderCode() {
    const { code_id, personAddressId, familyHistory, diseases, history, codeTime } = this.data
    return getApp().api.handleOrderCode({
      code_id,//条码id  
      person_address_id: personAddressId,//受检人地址id  
      family_history: familyHistory,//家族病史  
      diseases,//现有疾病  
      history,//用药史  
      code_time: codeTime,//检测日
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