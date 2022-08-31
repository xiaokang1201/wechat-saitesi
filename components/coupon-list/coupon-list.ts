// components/coupon-list/coupon-list.ts
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: Number,
      value: 0
    },
    list: Array,
    loadMoreType: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeList: ['去使用', '已使用', '已过期'],
    categoryList: ['通用', '品类券', '产品券'],
    // 0：通用，1：品类券, 2:产品券  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    btnClick({ currentTarget: { dataset: { item } } }: CurrentTarget<number>) {
      this.triggerEvent('btnClick', item)
    },
  }
})
