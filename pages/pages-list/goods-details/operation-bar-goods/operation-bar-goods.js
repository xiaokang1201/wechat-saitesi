// pages/pages-list/goods-details/operation-bar-goods/operation-bar-goods.js
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  
  /**
   * 组件的属性列表
   */
  properties: {
    goodsInfo: Object
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
    // 点击触发事件
    click({ currentTarget: { dataset: { method_name } } }) {
      this.triggerEvent(method_name)
    }
  }
})
