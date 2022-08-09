// pages/pages-list/address-harvest/address-list/list-address/list-address.js
Component({
  options: {
    styleIsolation: "apply-shared"
  },

  /**
   * 组件的属性列表
   */
  properties: {
    list: Array
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
    // 点击单个地址
    itemClick({ currentTarget: { dataset: { item } } }) {
      this.triggerEvent("itemClick", item)
    },
    // 点击单个地址编辑
    itemEditClick({ currentTarget: { dataset: { item } } }) {
      this.triggerEvent("itemEditClick", item)
    },
    // 点击单个地址删除
    itemDeleteClick({ currentTarget: { dataset: { id } } }) {
      this.triggerEvent("itemDeleteClick", id)
    },
    // 点击单个地址默认
    itemDefaultClick({ currentTarget: { dataset: { item: { id, is_default } } } }) {
      if(is_default === 1) return
      this.triggerEvent("itemDefaultClick", id)
    },
  }
})
