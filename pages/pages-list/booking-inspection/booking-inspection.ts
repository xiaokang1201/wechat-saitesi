// pages/pages-list/booking-inspection/booking-inspection.ts
import Validator from "../../../class/validator"
import apiGetConfig from "../../../private/api-get-config"

interface data {
  $state?: {
    userConfig: {
      custom_qrcode: string
    }
  },
  end_time: string, 
  start_time: string,
  code_ids: string,//条码id集合   
  booking_name: string,//预约人姓名  
  booking_age: string,//预约人年龄  
  booking_sex: number,//预约人性别 0女 1男  
  booking_mobile: string,//预约人手机号  
  booking_date: string,//预约日期
  booking_time: string,//预约时间
  dateStart: string,//开始日期
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,//显示添加专属客服弹框
    end_time: '00:00', 
    start_time: '00:00',
    code_ids: '',//条码id集合   
    booking_name: '',//预约人姓名  
    booking_age: '',//预约人年龄  
    booking_sex: 1,//预约人性别 0女 1男  
    booking_mobile: '',//预约人手机号  
    booking_date: '',//预约日期
    booking_time: '',//预约时间 
    dateStart: '',//开始时间
  } as data,

  // 修改性别
  setGender({ currentTarget: { dataset: { booking_sex } } }: CurrentTarget<number>){
    this.setData({ booking_sex })
  },

  // 勾选日期
  dateChange({ detail: { value } }: Detail<string>) {
    this.setData({ booking_date: value })
  },

  // 勾选时间
  timeChange({ detail: { value } }: Detail<string>) {
    this.setData({ booking_time: value })
  },

  // 提交预约信息
  apiHandleBooking() {
    const { code_ids, booking_name, booking_age, booking_sex, booking_mobile, booking_date, booking_time } = this.data
    return getApp().api.handleBooking({ 
      code_ids,
      booking_name,
      booking_age,
      booking_sex,  
      booking_mobile,  
      booking_date,
      booking_time,
    })
  },

  // 获取配置信息

  // 提交
  async submit() {
    const { isEmpty, isMobile } = new Validator()
    const { booking_name, booking_age, booking_mobile, booking_date } = this.data
    if(
      !isEmpty(booking_name, '请输入姓名')
      &&!isEmpty(booking_age, '请输入年龄')
      &&!isEmpty(booking_mobile, '请输入手机号')
      &&!isMobile(booking_mobile, '请输入正确格式手机号')
      &&!isEmpty(booking_date, '请输选择预约日期')
      &&!isEmpty(booking_date, '请输选择预约时间')
    ) {
      await this.apiHandleBooking()
      await getApp().tool.alert('提交成功')
      this.setData({ show: true })
    }
  },

  // 关闭弹框
  shutDown() {
    this.setData({ show: false })
    getApp().tool.jump_back()
  },
  // 获取当前时间
  setStartDate() {
    let dates = new Date()
    // dates.setTime(dates.getTime() + 24 * 60 * 60 * 1000); 
    let year = dates.getFullYear()//获取完整的年份(4位)
    let month = dates.getMonth() + 1//获取当前月份(0-11,0代表1月)
    let date = dates.getDate()//获取当前日(1-31)
    this.setData({
      dateStart: `${year}-${this.lessThanZero(month)}-${this.lessThanZero(date)}`
    })
  },
  // 小于10补0
  lessThanZero(number: number) {
    return number >= 10 ? number : (number > 0 ? '0'+number : '00') 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ code }: Body<string>) {
    console.log('code', code)
    this.data.code_ids = code
    apiGetConfig().then(({ end_time, start_time }: Body<string>) => {
      this.setData({ end_time, start_time })
    })
    this.setStartDate()
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