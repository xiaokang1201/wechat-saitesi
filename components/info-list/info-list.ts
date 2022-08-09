// components/info-list/info-list.ts
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
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
    // 跳转详情
    infoItemClick({ currentTarget: { dataset: { id } } }: CurrentTarget<number>) {
      getApp().tool.jump_nav(`/pages/pages-list/info-details/info-details?id=${id}`)
    },
  }
})
