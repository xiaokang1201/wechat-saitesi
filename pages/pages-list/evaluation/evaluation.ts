// pages/pages-list/evaluation/evaluation.ts
const { api, tool } = getApp()
import useThrottle from "../../../hook/use-throttle"
const { login } = require("../../../utils/api/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderSn: '',//订单编号
    cartInfo: {
      productInfo: {
        image: "https://game.vrupup.com/resources/mk/202201/17_164240882361e52b77f2d49.jpg",
        store_name: "丝蛋白金致爽肤水乳液面霜+凝时洁面A醇视黄醇抗初老淡纹礼盒装",
      },
      cart_num: 1,
      unique: ''
    },
    unique: '',//	购物车商品唯一标识
    comment: '',//评价内容
    picList: [],//图片列表
    inputFocus: false,//输入框是否聚焦
    isAnonymous: false,//是否匿名
    star: 0,//点赞数
  },
  // 点击评星
  starClick({ currentTarget: { dataset: { index } } }: Index) {
    this.setData({ star: index+1 })
  },
  // 点击匿名
  anonymousClick() {
    this.setData({ isAnonymous: !this.data.isAnonymous })
  },
  // 点击评论
  commentsClick() {
    this.setData({ inputFocus: true })
  },
  // 文本框失去焦点
  textareaBlur() {
    this.setData({ inputFocus: false })
  },
  // 文本框输入
  textareaChange({ detail: { value } }: Detail<string>) {
    this.data.comment = value
    this.setData({ comment: value })
  },
  // 图片列表 删除图片
  deletePic({ currentTarget: { dataset: { index } } }: Index) {
    const picList = this.data.picList
    picList.splice(index, 1)
    this.setData({ picList })
  },
  // 点击预览图片
  previewImageClick({ currentTarget: { dataset: { img_src } } }: CurrentTarget<string>) {
    tool.previewImage(this.data.picList, img_src)
  },
  // 点击上传图片
  uploadImgClick() {
    if(this.data.picList.length >= 3) return tool.alert("最多上传三张", 1000, 2)
    tool.chooseImage().then(({ tempFilePaths }: Body<string>) => {
      tool.uploadFiles(tempFilePaths, api.upload()).then((res: []) => {
        this.setData({ picList: this.data.picList.concat(res) })
      })
    })
  },
  // 点击发布
  releaseClick: useThrottle(async function (this: any) {
    if(this.data.comment.trim() === '') return tool.alert('请填写评价内容', 1000, 2)
    await this.apiOrderComment()
    await tool.alert('评价成功', 1000, 1)
    tool.jump_back()
  }),
  // 订单商品评价
  apiOrderComment() {
    const { cartInfo: { unique }, comment, picList, star, isAnonymous } = this.data
    return api.orderComment({ unique, comment, pics: picList.join(','), star, is_anonymous: isAnonymous })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ cartInfo }: Body<string>) {
    // 上传接口走微信API需要 登录刷新token防止token失效
    login()
    this.setData({ cartInfo: JSON.parse(cartInfo) })
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