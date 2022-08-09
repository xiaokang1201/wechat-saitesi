// components/list-comment/list-comment.js
const { tool } = getApp()
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  
  /**
   * 组件的属性列表
   */
  properties: {
    // 评论列表
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
    // 点击图片预览
    imageClick({ currentTarget: { dataset: { list_url, url } } }) {
      tool.previewImage(list_url, url)
    }
  }
})
