import { myRequest } from './request'
import config from '../../config'
export default {
/**
 * 接口请求封装
 * @param { Object } data 传参
 * @param { String } url 请求地址
 * @param { String } method 请求方式
 * @param { Boolean } isOpenid 是否默认带上唯一标识
 * @param { Number } contentType content-type类型，0为application/x-www-form-urlencoded，1为application/json
 * @returns 请求结果
 */
  //原始方法
  myRequest,
  //测试token失效接口
  getUserInfo: (data, url = 'get_user_detail') => { return myRequest(data, url, 'get', false, 1) }, 
  
  //#region 用户
  // 图片上传
  upload: () => { return `${config.REQUESTURL}upload` },
  // 用户详情
  userDetail: (data, url = 'user_detail') => { return myRequest(data, url, 'get') },
  // 我的消息
  myMsg: (data, url = 'my_msg') => { return myRequest(data, url, 'get') },
  // 配置信息
  getConfig: (data, url = 'get_config') => { return myRequest(data, url, 'get') },
  // 申请分销商
  commissionApply: (data, url = 'commission_apply') => { return myRequest(data, url) },
  // 我的佣金
  userCommission: (data, url = 'user_commission') => { return myRequest(data, url, 'get') },
  // 提现申请
  withdrawal: (data, url = 'withdrawal') => { return myRequest(data, url) },
  //#endregion
  
  //#region 轮播图
  // 获取轮播图列表
  getBanner: (data, url = 'get_banner') => { return myRequest(data, url, 'get') }, 
  //#endregion

  //#region 购物车
  // 我的购物车
  userCart: (data, url = 'user_cart') => { return myRequest(data, url, 'get') },
  // 添加购物车
  addCart: (data, url = 'add_cart') => { return myRequest(data, url) },
  // 删除购物车
  delCart: (data, url = 'del_cart') => { return myRequest(data, url) },
  // 修改购物车数量
  cartNum: (data, url = 'cart_num') => { return myRequest(data, url) },
  // 购物车确认订单页面
  confirmOrders: (data, url = 'confirm_orders') => { return myRequest(data, url) },
  //#endregion
  
  //#region 订单
  // 预约详情
  bookingDetail: (data, url = 'booking_detail') => { return myRequest(data, url, 'get') },
  // 邮寄条码
  mailCode: (data, url = 'mail_code') => { return myRequest(data, url) },
  // 我的寄回条码
  myCodes: (data, url = 'my_codes') => { return myRequest(data, url, 'get') },
  // 我的报告
  myReport: (data, url = 'my_report') => { return myRequest(data, url, 'get') },
  // 获取物流信息
  getExpressInfo: (data, url = 'get_express_info') => { return myRequest(data, url, 'get') },
  // 提交条码
  handleOrderCode: (data, url = 'handle_order_code') => { return myRequest(data, url) },
  // 提交预约信息
  handleBooking: (data, url = 'handle_booking') => { return myRequest(data, url) },
  // 再来一单
  moreOrder: (data, url = 'more_order') => { return myRequest(data, url) },
  // 确认订单页面
  confirmOrder: (data, url = 'confirm_order') => { return myRequest(data, url) },
  // 提交订单
  createOrder: (data, url = 'create_order') => { return myRequest(data, url) },
  // 订单列表
  orderList: (data, url = 'order_list') => { return myRequest(data, url, 'get') },
  // 订单详情
  orderDetail: (data, url = 'order_detail') => { return myRequest(data, url, 'get') },
  // 订单取消
  cancerOrder: (data, url = 'cancer_order') => { return myRequest(data, url) },
  // 取消预约
  cancelBooking: (data, url = 'cancel_booking') => { return myRequest(data, url) },
  // 订单删除
  deleteOrder: (data, url = 'delete_order') => { return myRequest(data, url) },
  // 已存在订单支付
  orderPay: (data, url = 'order_pay') => { return myRequest(data, url) },
  // 确认收货
  orderSure: (data, url = 'order_sure') => { return myRequest(data, url) },
  // 订单商品评价
  orderComment: (data, url = 'order_comment') => { return myRequest(data, url) },
  // 申请退款
  orderRefund: (data, url = 'order_refund') => { return myRequest(data, url) },
  // 根据优惠券重新计算订单金额
  orderComputed: (data, url = 'order_computed') => { return myRequest(data, url) },
  // 预约列表
  bookingList: (data, url = 'booking_list') => { return myRequest(data, url, 'get') },
  // 查询条码
  getOrderCode: (data, url = 'get_order_code') => { return myRequest(data, url, 'get') },
  // 申请发票
  orderInvoice: (data, url = 'order_invoice') => { return myRequest(data, url) },
  //#endregion


  //#region 商品
  // 适用人群
  personList: (data, url = 'person_list') => { return myRequest(data, url, 'get') },
  // 热门商品列表
  hotGoods: (data, url = 'hot_goods') => { return myRequest(data, url, 'get') },
  // 商品分类
  goodsCategory: (data, url = 'goods_category') => { return myRequest(data, url, 'get') },
  // 商品列表
  goodsList: (data, url = 'goods_list') => { return myRequest(data, url, 'get') },
  // 商品详情
  goodsDetail: (data, url = 'goods_detail') => { return myRequest(data, url, 'get') },
  // 商品收藏
  goodsCollection: (data, url = 'goods_collection') => { return myRequest(data, url) },
  // 我的收藏
  myCollection: (data, url = 'my_collection') => { return myRequest(data, url, 'get') },
  // 商品全部评价
  goodsComments: (data, url = 'goods_comments') => { return myRequest(data, url, 'get') },
  // 浏览足迹
  viewLog: (data, url = 'view_log') => { return myRequest(data, url, 'get') },
  //#endregion

  //#region 资讯通知 
  // 全部公告
  noticeIndex: (data, url = 'notice_index') => { return myRequest(data, url, 'get') },
  // 详情
  noticeDetail: (data, url = 'notice_detail') => { return myRequest(data, url, 'get') },
  // 评论
  noticeComment: (data, url = 'notice_comment') => { return myRequest(data, url) },
  //#endregion
  
  //#region 收获地址
  // 添加收货地址
  addAddress: (data, url = 'add_address') => { return myRequest(data, url) },
  // 编辑收货地址
  editAddress: (data, url = 'edit_address') => { return myRequest(data, url) },
  // 地址列表
  addressList: (data, url = 'address_list') => { return myRequest(data, url, 'get') },
  // 删除地址
  delAddress: (data, url = 'del_address') => { return myRequest(data, url) },
  // 设置默认售后地址
  setDefaultAddress: (data, url = 'set_default_address') => { return myRequest(data, url) },
  //#endregion

  //#region 受检人地址
  // 地址列表
  personAddressList: (data, url = 'person_address_list') => { return myRequest(data, url, 'get') },
  // 新增
  addPersonAddress: (data, url = 'add_person_address') => { return myRequest(data, url) },
  // 编辑
  editPersonAddress: (data, url = 'edit_person_address') => { return myRequest(data, url) },
  // 删除
  delPersonAddress: (data, url = 'del_person_address') => { return myRequest(data, url) },
  //#endregion

  //#region 优惠券
  // 我的优惠券
  userCoupon: (data, url = 'user_coupon') => { return myRequest(data, url, 'get') },
  // 未领取优惠券
  couponList: (data, url = 'coupon_list') => { return myRequest(data, url, 'get') },
  // 领取优惠券
  receiveCoupon: (data, url = 'receive_coupon') => { return myRequest(data, url) },
  //#endregion

  //#region 文章
  // 全部热门文章
  noticeHot: (data, url = 'notice_hot') => { return myRequest(data, url, 'get') }, 
  //#endregion

  //#region 分销员
  // 详情
  userDistributorDetail: (data, url = 'user_distributor_detail') => { return myRequest(data, url, 'get') }, 
  
  //#endregion


  //#region VIP
  vipLogin: (data, url = 'vip_login') => { return myRequest(data, url) }, 
  vipDetail: (data, url = 'vip_detail') => { return myRequest(data, url, 'get') }, 
  vipGoods: (data, url = 'vip_goods') => { return myRequest(data, url, 'get') }, 
  //#endregion
}