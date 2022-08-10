// pages/pages-list/withdrawal/withdrawal.ts
import useThrottle from "../../../hook/use-throttle"


interface data {
  amount: string | number,
  balance: string | number
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: '',//待提现金额
    balance: 0,//可提现金额
  } as data,

  // 点击全部提现
  allBalanceClick() {
    this.setData({ 
      amount: this.data.balance
    })
  },

  // 提现输入框
  inputchange({ detail: { value } }: Detail<string>) {
    const amount = parseFloat(value)
    this.setData({ 
      amount: value > this.data.balance ? this.data.balance : amount
    })
  },

  // 申请提现
  apiWithdrawal: useThrottle(function (this: any) {
    getApp().api.withdrawal({ amount: this.data.amount }).then(({ msg }: Body<string>) => {
      getApp().tool.alert(msg)
    })
  }),

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ balance }: Body<string>) {
    this.setData({ balance: Number(balance) })
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