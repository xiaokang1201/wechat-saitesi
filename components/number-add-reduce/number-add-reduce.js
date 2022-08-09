// components/number-add-reduce/number-add-reduce.js
Component({
  options: {
    styleIsolation: "apply-shared"
  },

  /**
   * 组件的属性列表
   */
  properties: {
    // input值
    value: {
      type: Number,
      value: 1
    },
    // 最大长度
    maxlength: {
      type: Number,
      value: 2
    },
    // 最小值
    minNumber: {
      type: Number,
      value: 1
    },
    // 最大值
    maxNumber: {
      type: Number,
      value: 99
    },
  },

  externalClasses: ['number-add-reduce-class'],

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 数量减少
    numberReduce() {
      if(this.data.value <= 1) return
      this.numberChange(this.data.value - 1)
    },
    // 数量增加
    numberAdd() {
      if(this.data.value >= 99) return
      this.numberChange(this.data.value + 1)
    },
    // 输入框失去触发
    inputBlur({ detail: { value } }) {
      value = Number(value)
      if(value === this.data.value) return
      if(value <= this.data.minNumber) value = this.data.minNumber
      if(value >= this.data.maxNumber) value = this.data.maxNumber
      this.numberChange(value)
    },
    // 订单商品数量修改
    numberChange(number) {
      this.setData({ value: number })
      this.triggerEvent("numberChange", number)
    }
  }
})
