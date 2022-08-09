// pages/pages-list/search/search-history/search-history.js
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
    // 点击单个搜索记录
    historyItemClick({ currentTarget: { dataset: { item } } }) {
      this.triggerEvent("historyItemClick", item)
    },
    // 点击删除搜索历史记录
    deleteSearchHistoryClick() {
      this.triggerEvent("deleteSearchHistoryClick")
    }
  }
})
