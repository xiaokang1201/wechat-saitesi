import useThrottle from "../../../hook/use-throttle"

// pages/pages-list/distribution-center/distribution-center.ts
interface data {
  $state: {
    userInfo: {
      did: number
    }
  }
  list: [],
  show: boolean,
  today_commission: string,
  all_commission: string,
  distributor: {
    balance: string
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    show: false,
    today_commission: '',//今日佣金
    all_commission: '',//	累计佣金  
    distributor: {},//分销员详情
  } as data,

  // 提现
  goRichText() {
    getApp().tool.jump_nav(`/pages/pages-list/rich-text/rich-text?type=1`)
  },

  // 提现
  withdrawal() {
    getApp().tool.jump_nav(`/pages/pages-list/withdrawal/withdrawal?balance=${this.data.distributor.balance}`)
  },
  
  // 查看分佣明细
  lookCommission() {
    getApp().tool.jump_nav(`/pages/pages-list/commission/commission`)
  },

  // 提交申请
  submit: useThrottle(async function (this: any, { detail }: Body<string>) {
    await this.apiCommissionApply(detail)
    getApp().tool.alert('提交成功')
    this.setData({ show: false })
  }),

  // 申请分销商
  apiCommissionApply(reason: string) {
    return getApp().api.commissionApply({ reason })
  },

  // 点击遮罩层
  clickoverlay() {
    this.setData({ show: false })
  },

  // 点击申请分销员
  applyClick() {
    if(!this.isApply()) {
      this.setData({ show: true })
    }
  },

  // 判断是否分销员
  isApply() {
    return this.data.$state.userInfo.did > 0
  },  

  // 获取分销员详情
  apiUserDistributorDetail() {
    type userDistributorDetail = {
      data: { distributor: { balance: string }, commission_list: [], today_commission: string, all_commission: string }
    }
    getApp().api.userDistributorDetail().then(({ data: { distributor, commission_list, today_commission, all_commission } }: userDistributorDetail) => {
      this.setData({
        distributor,
        list: commission_list,
        today_commission,
        all_commission
      })
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
    if(this.isApply()) {
      this.apiUserDistributorDetail()
    }
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