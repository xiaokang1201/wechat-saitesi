// components/type-list/type-list.ts
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    typeList: Array,
    typeIndex: Number,
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
    // 点击类型项
    typeItemClick({ currentTarget: { dataset: { index } } }: Index) {
      this.setData({ typeIndex: index })
      this.triggerEvent('typeItemClick', index)
    },
  }
})
