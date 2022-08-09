// components/search/search.js
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
      value: 1,
    },
    placeholder: {
      type: String,
      value: "请输入关键字"
    },
    disabled: {
      type: Boolean,
      value: false
    },
    focus: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: ""
    },
    confirmType: {
      type: String,
      value: 'done'
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
    // 输入框输入触发
    inputChange({ detail: { value } }) {
      this.data.value = value
      this.triggerEvent("inputChange", value)
    },
    // 输入框点击搜索
    inputConfirm({ detail: { value } }) {
      this.triggerEvent("inputConfirm", value)
    },
    // 点击搜索
    searchClick() {
      this.triggerEvent("searchClick", this.data.value)
    }
  }
})
