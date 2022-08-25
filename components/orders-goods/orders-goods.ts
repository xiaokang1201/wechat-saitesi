// components/orders-goods/orders-goods.ts
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 0 常规 1退款商品 自采订单 3订单详情
    type: {
      type: Number,
      value: 0,
    },
    object: {
      type: Object,
      value: {
        thumb: '/assets/images/component/orders-goods/0.png',
        goods_name: '白茶净颜细致调理乳',
        tag: '小款',
        sukList: ['小款', '大', '黑'],
        price: '566.00',
        cart_num: 1
      }
    },
    orderDetail: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    click({ currentTarget: { dataset: { methods } } }: CurrentTarget<string>) {
      this.triggerEvent(methods)
    }
  }
})
