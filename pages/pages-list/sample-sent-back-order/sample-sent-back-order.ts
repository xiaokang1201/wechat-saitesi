// pages/pages-list/sample-sent-back-order/sample-sent-back-order.ts

interface data {
  list: object[],
  form: object[],
  dateList: string[] | [],
  timeList: string[],
  timeList1: string[],
  timeNumber: number[],
  show: boolean,
  currentTime: number,
  timeValue: number[]
  timeValue1: number[] | []
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{},{}],//列表
    form: [
      { name: '发货人' },
      { name: '电话' },
      { name: '取件地址' },
    ],
    dateList: [],//当前时间往后10天日期
    timeList: ['09: 00', '11: 00', '13: 00', '15: 00', '17: 00', '19: 00'],
    timeList1: ['09: 00', '11: 00', '13: 00', '15: 00', '17: 00', '19: 00'],
    timeNumber: [9, 11, 13, 15, 17, 19],
    currentTime: new Date().getHours() + 2,//当前时间
    show: false,//取件时间弹框
    timeValue: [0, 0],//选择日期时间索引
    timeValue1: [],//选择日期时间索引 提交
  } as data,

  // 点击选择取件时间
  pickTimeClick() {
    this.setData({ show: true })
  },
  // 确定选取时间
  confirm() {
    const { timeList, timeValue } = this.data
    if(timeList[timeValue[0]]) {
      this.setData({ 
        show: false,
        timeValue1: timeValue
      })
    }
  },

  // 取消选择时间
  cancel() {
    this.setData({ show: false })
  },

  // 选择对应时间
  pickerChange({ detail: { value } }: { detail: { value: number[] } }) {
    console.log('bindChange')
    if(value[0] === 0) {
      this.getTime()
      this.getDate()
    } else {
      this.setData({ timeList: this.data.timeList1 })
    }
    this.setData({ timeValue: value })
  },

  // 获取当前开放时间
  getTime() {
    const { currentTime, timeNumber, timeList1 } = this.data
    const list = JSON.parse(JSON.stringify(timeList1))
    for(const i in timeNumber) {
      if(currentTime >= timeNumber[Number(i)]) {
        list.shift()
      }
    }
    if(list.length === 1) list.unshift(timeList1[timeList1.length - 2])
    this.data.timeList = list
    this.setData({ timeList: list })
  },

  // 获取当前时间往后10天日期
  getDate() {
    const zeroPoint = new Date(new Date().toLocaleDateString()).getTime()
    const dateList = []
    for(let i = 0; i < 5; i++) {
      dateList.push(this.timestampToTime(zeroPoint+(i)*60*60*24*1000))
    }
    dateList[0] += '(今日)'
    dateList[1] += '(明日)'
    if(this.data.timeList.length === 0) {
      dateList.shift()
      this.setData({ timeList: this.data.timeList1 })
    }
    this.setData({ dateList })
  },

  // 时间戳转时间
  timestampToTime(timestamp: number) {
    const date = new Date(timestamp)
    return `${date.getMonth() + 1}月${date.getDate()}日`
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getTime()
    this.getDate()
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