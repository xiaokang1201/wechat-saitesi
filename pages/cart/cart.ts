// pages/cart/cart.ts
const { tool, api } = getApp()

import loadMoreType from "../../hook/use-load-more"
import useThrottle from "../../hook/use-throttle"

interface data {
  cartList: CartList[] | [],
  checkNumber: number,
  totalAmount: string,
  loadMoreType: number,
  isDelete: boolean
}
interface CartList {
  suk: string,
  sukList: string[],
  check: boolean,
  cart_num: number,
  costPrice: string,
  is_collection: boolean,
  productInfo: {
    id: number,
    price: string
  },
  id: number,
  type: number
}

type cartGoodsNumberChange = {
  currentTarget: { dataset: { 
      cart_id: number, 
      index: number
  }},
  detail: number
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalAmount: '0.00',//合计（总金额）
    checkNumber: 0,//选中个数
    cartList: [],//购物车列表
    loadMoreType: 1,//列表加载状态
    isDelete: false,//是否删除状态
  } as data,

  // 点击管理
  managementClick() {
    this.setData({ isDelete: !this.data.isDelete })
  },

  // 购物车商品数量变化
  cartGoodsNumberChange({ currentTarget: { dataset: { cart_id, index } }, detail }: cartGoodsNumberChange) {
    this.apiCartNum(cart_id, detail, index)
  },
  // 点击商品跳转商品详情 detail -> goods_id
  goodsJumpDetail({ detail }: Body<number>) {
    tool.jump_nav(`/pages/pages-list/goods-details/goods-details?goods_id=${detail}`)
  },
  // 点击立即购买进入订单详情
  buyNow: useThrottle(function (this: any) {
    if(this.data.checkNumber <= 0) return tool.alert("请选择商品", 1000, 2)
    const list = this.checkCartList()
    const type1 = list.filter((item: { type: number }) => item.type === 1)
    const type2 = list.filter((item: { type: number }) => item.type === 2)
    if(type1.length > 0 && type2.length > 0) {
      return tool.alert("预约产品和自采产品不可一起结算哦~")
    }
    tool.jump_nav(`/pages/pages-list/order-details/order-details?cart_id=${this.checkCartListId()}&type=${type1.length > 0 ? 1 : 2}`)
  }),
  // 点击批量删除购物车
  batchDeleteCartClick() {
    this.apiDelCart(this.checkCartListId())
  },
  // 点击删除购物车商品 index
  deleteCartClick({ currentTarget: { dataset: { index } } }: Index) {
    this.apiDelCart(this.data.cartList[index].id)
  },
  // 点击收藏购物车商品 detail -> 购物车列表索引 index
  collectionCartClick: useThrottle(async function (this: any, { detail }: Body<number>) {
    await this.apiGoodsCollection(this.data.cartList[detail].productInfo.id)
    tool.alert("收藏成功", 1000, 1)
  }),
  // 全部勾选
  setCheckAll() {
    this.data.cartList.forEach(item => {
      item.check = this.data.checkNumber !== this.data.cartList.length
    })
    this.setData({
      cartList: this.data.cartList
    })
    this.computedCheckNumber()
  },
  // 点击单个购物车勾选按钮
  cartItemClick({ currentTarget: { dataset: { index } } }: Index) {
    this.setData({ 
      [`cartList[${index}].check`]: !this.data.cartList[index].check 
    })
    this.computedCheckNumber()
  },
  // 返回当前选中的购物车列表
  checkCartList(): CartList[] {
    return this.data.cartList.filter(item => !!item.check)
  },
  // 返回当前选中的购物车列表id集合字符串,拼接
  checkCartListId(): string {
    return this.checkCartList().map(item => item.id).join(',')
  },
  // 计算购物车选中数量
  computedCheckNumber() {
    this.setData({ checkNumber: this.checkCartList().length })
    this.computedTotalAmount()
  },
  // 计算合计金额
  computedTotalAmount() {
    this.setData({
      totalAmount: this.checkCartList().reduce((prev, cur) => {
        console.log(prev, cur)
        const cart_num = Number(cur.cart_num) || 0
        const price = Number(cur.productInfo.price) || 0
        return prev + cart_num*price
      } , 0).toFixed(2)
    })
  },
  // 初始化购物车
  initCart() {
    this.setData({ 
      totalAmount: '0.00',
      checkNumber: 0,
      cartList: [],
      loadMoreType: 1,
      isDelete: false,
    })
    this.apiUserCart()
  },
  //#region API
  // 修改购物车数量
  apiCartNum(cart_id: number, number: number, index: number) {
    tool.loading()
    api.cartNum({ cart_id, number })
    .then(() => {
      this.data.cartList[index].cart_num = number
      this.computedTotalAmount()
    })
    .catch(() => {
      this.setData({
        [`cartList[${index}].cart_num`]: this.data.cartList[index].cart_num
      })
    })
    .finally(() => tool.loading_h())
  },
  // 删除购物车
  apiDelCart: useThrottle(async function (this: any, cart_id: number | string) {
    await api.delCart({ cart_id })
    tool.alert("已成功删除商品", 1000, 1)
    this.initCart()
  }),
  // 商品收藏
  apiGoodsCollection(goods_id: number) {
    return api.goodsCollection({ goods_id })
  },
  // 获取我的购物车列表
  apiUserCart() {
    api.userCart().then(({ data }: Body<[CartList]>) => { 
      for(const i of data) {
        i.sukList = i.suk.split(',')
      }
      this.setData({ 
        cartList: data,
        loadMoreType: loadMoreType(data, false) 
      }) 
    })
  },
  //#endregion

  // // 点击收藏购物车商品
  // collectionCartClick({ currentTarget: { dataset: { index } } }) {
  //   this.triggerEvent("collectionCartClick", index)
  //   this.switchOffTouchMove(index)
  // },
  // // 点击删除购物车
  // deleteCartClick({ currentTarget: { dataset: { index } } }) {
  //   this.triggerEvent("deleteCartClick", index)
  //   this.switchOffTouchMove(index)
  // },
  // // 关闭滑动状态
  // switchOffTouchMove(index) {
  //   this.setData({ [`list[${index}].isTouchMove`]: false })
  // }

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
    this.initCart()
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