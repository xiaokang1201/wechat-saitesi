// components/goods-list/goods-list.ts
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    type: Number,
    list: Array,
    loadMoreType: {
      type: Number,
      value: 1
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
    // 点击列表项
    itemClick({ currentTarget: { dataset: { goods_id } } }: CurrentTarget<number>) {
      getApp().tool.jump_nav(`/pages/pages-list/goods-details/goods-details?goods_id=${goods_id}`)
      // this.triggerEvent('itemClick', id)
    },
  }
})
