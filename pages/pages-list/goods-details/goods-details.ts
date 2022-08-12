// pages/pages-list/goods-details/goods-details.ts
import config from "../../../config";
import useThrottle from "../../../hook/use-throttle";

interface data extends $State {
  swiperList: object[],
  specificationList: object[],
  swiperIndex: number,
  currentIndex: number,
  type: number,
  goodsId: number,
  goodsInfo: GoodsInfo,
  productValueKey: string,
  productAttr: [] | ProductAttr[],
  productValue:  [] | ProductValue[],
  showPop: number,
  coupons: number,
  did: number,
  buyNumber: number
}
interface GoodsInfo {
  description: string,
  comments: string,
  type: number,
  is_collection: boolean,
  store_name: string,
  image: string,
}
interface ProductAttr {
  attr_name: string,
  attr_value: AttrValue[],
  product_id: string,
  index: number
}
interface AttrValue { 
  attr: string, 
  check: boolean 
}
interface ProductValue {
  image: string,
  ot_price: string,
  price: string,
  unique: string,
  suk: string,
  product_id: number,
  stock: number,
  [key: string]: string | number 
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isUseShare: true,//独立分享
    swiperList: [{},{},],//轮播图列表
    swiperIndex: 0,//轮播图索引
    currentIndex: 0,//切换索引
    type: 0,//自采 预约
    specificationList: [
      {},{},{},
    ],//规格列表
    goodsId: 0,//商品id
    did: 0,//分销员id
    goodsInfo: {} as GoodsInfo,//商品信息
    show: false,//规格弹框
    showPop: 0,//弹框类型 0 选择规格查看 1 加入购物车 2 立即购买
    productValueKey: '',//规格组合key
    productAttr: [],//规格列表
    productValue: [],//规格组
    coupons: 0,//优惠券数量
    buyNumber: 1,//购买数量
  } as data,

  // 查看更多评论
  viewMoreClick() {
    getApp().tool.jump_nav(`/pages/pages-list/comment-list/comment-list?goodsId=${this.data.goodsId}`)
  },

  // 购买数量变化
  numberChange({ detail }: Body<number>) {
    this.data.buyNumber = detail
  },

  // 点击确认提交
  submit() {
    switch (this.data.showPop) {
      case 0:
      break;
      case 1:
        this.addCart()
      break;
      case 2:
        this.buyNow()
      break;
    }
    this.hiddenPop()
  },
  
  // 点击规格项
  attrValueItemClick({ currentTarget: { dataset: { index, attrValueIndex } } }: CurrentTarget<number>) {
    const attrValue = this.data.productAttr[index].attr_value
    attrValue.forEach((item, index) => {
      item.check = index === attrValueIndex
    });
    this.setData({
      [`productAttr[${index}].attr_value`]: attrValue,
    })
    this.setSpecifications()
  },

  // 关闭弹框
  hiddenPop() {
    this.setData({ show: false })
  },

  // 打开弹框
  showPop(type: number) {
    this.data.showPop = type
    this.setData({ show: true, showPop: type })
  },

  // 点击规格
  specificationsClick() {
    this.showPop(0)
  },

  // 根据勾选规则框匹配对应规则信息
  setSpecifications() {
    const list: string[] = []
    this.data.productAttr.forEach(item => {
      item.attr_value.forEach(attrValueItem => {
        if(attrValueItem.check) {
          list.push(attrValueItem.attr)
        }
      });
    });
    this.setData({ productValueKey: list.join(',') })
  },

  // 轮播触发
  swiperChange({ detail: { current } }: Detail<number>) {
    this.data.swiperIndex = current
    this.setData({
      currentIndex: current
    })
  },

  // 点击收藏
  collectionClick: useThrottle(async function (this: any) {
    await this.apiGoodsCollection()
    getApp().tool.alert(`${this.data.goodsInfo.is_collection ? '取消收藏成功' : '收藏成功'}`, 1000, 1)
    this.setData({ ['goodsInfo.is_collection']: !this.data.goodsInfo.is_collection })
  }),

  // 点击立即购买
  buyNowClick() {
    console.log('点击立即购买')
    this.showPop(2)
  },

  // 立即购买
  async buyNow() {
    const { cartId } = await this.apiAddCart(1)
    getApp().tool.jump_nav(`/pages/pages-list/order-details/order-details?type=${this.data.goodsInfo.type}&cart_id=${cartId}&did=${this.data.did}`)
  },
  
  // 点击加入购物车
  addCartClick() {
    this.showPop(1)
  },

  // 加入购物车
  async addCart() {
    const { msg } = await this.apiAddCart(0)
    getApp().tool.alert(msg, 1000, 1)
  },

  // 商品收藏
  apiGoodsCollection() {
    return getApp().api.goodsCollection({ 
      goods_id: this.data.goodsId,
      type: this.data.goodsInfo.is_collection ? 2 : 1
    })
  },

  // 添加购物车
  apiAddCart(_new: number): Promise<{cartId: number, msg: string}> {
    const { productValue, productValueKey, buyNumber }  = this.data
    return new Promise((resove) => {
      getApp().api.addCart({
        goods_id: this.data.goodsId, 
        new: _new, 
        cart_num: buyNumber,
        unique: productValue[productValueKey].unique 
      }).then(({ data: { cartId }, msg }: { data: { cartId: number }, msg: string }) => {
        resove({ cartId, msg })
      })
    })
  },

  // 获取商品详情信息
  apiGoodsDetail() {
    getApp().tool.loading()
    type goodsDetail = { data: { 
      goods_info: GoodsInfo, 
      productAttr: ProductAttr[], 
      productValue: ProductValue[], 
      coupons: number } 
    }
    getApp().api.goodsDetail({ goods_id: this.data.goodsId })
    .then(({ data: { goods_info, productAttr, productValue, coupons } }: goodsDetail) => {
      getApp().tool.loading_h()
      goods_info.description = goods_info.description.replace(/<img/g, '<img style="width:100%;height:auto;"')
      goods_info.comments = JSON.parse(goods_info.comments)
      productAttr.forEach(item => {
        item.attr_value.forEach((attrValueItem, index) => {
          if(index === 0) attrValueItem.check = true
        });
      });
      this.data.productAttr = productAttr
      this.setData({ 
        coupons,
        goodsInfo: goods_info,
        productAttr,
        productValue
      })
      this.setSpecifications()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ goods_id, did }) {
    console.log('goods_id did', goods_id, did)
    this.data.goodsId = Number(goods_id)
    this.data.did = Number(did) || 0
    this.apiGoodsDetail()
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
    const SHAREINFO =  config.SHAREINFO
    SHAREINFO.title = this.data.goodsInfo.store_name
    SHAREINFO.imageUrl = this.data.goodsInfo.image
    SHAREINFO.path = `/pages/index/index?goods_id=${this.data.goodsId}&did=${this.data.$state?.userInfo?.did}`
    return SHAREINFO
  }
})