// pages/pages-list/order-details/coupons/coupons.js
Component({
  options: {
    styleIsolation: "apply-shared"
  },

  /**
   * 组件的属性列表
   */
  properties: {
    couponPrice: String,//优惠金额
    beUseCoupon: {},//待使用优惠券
    usableCoupon: Array,//可使用的优惠券
    unUsableCoupon: Array, //不可使用优惠券
    couponsType: {
      type: Number,
      value: 0
    },//优惠券类型切换 0 可用/ 1 不可用
    usableCouponIndex: {
      type: Number,
      value: 0
    },//优惠券选中索引 默认使用可用优惠券第一个
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,//优惠券底部弹框开关
    couponsTypeList: ['可用优惠券', '不可用优惠券'],//优惠券类型列表
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击确认选中优惠券
    confirmCouponClick() {
      this.hiddenPop()
      this.triggerEvent("confirmCouponClick", this.data.usableCouponIndex)
    },
    // 点击切换优惠券类型
    switchCouponsType({ currentTarget: { dataset: { index } } }) {
      this.triggerEvent("usableCouponIndex", index)
      this.setData({ couponsType: index })
    },
    // 点击单个可用优惠券切换使用
    itemCouponsClick({ currentTarget: { dataset: { index } } }) {
      this.triggerEvent("switchUsableCouponIndex", index)
    },
    // 打开弹框
    showPop() {
      this.data.show = true
      this.setData({ show: true })
      this.popChange()
    },
    // 关闭弹框
    hiddenPop() {
      this.data.show = false
      this.setData({ show: false })
      this.popChange()
    },
    // 修改弹框发生变化
    popChange() {
      this.triggerEvent('popChange', this.data.show)
    },
    // 空函数
    empty() { return },
  }
})
