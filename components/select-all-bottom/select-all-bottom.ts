// components/select-all-bottom/select-all-bottom.ts
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: { 
    text: {
      type: String,
      value: '寄回'
    },
    select: {
      type: Boolean,
      value: false
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
    // 点击全选
    allClick() {
      this.triggerEvent('allClick')
    },
  }
})
