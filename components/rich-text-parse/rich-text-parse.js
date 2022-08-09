// components/rich-text-parse/rich-text-parse.js
import WxParse from './wxParse/wxParse.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    nodes: {
      type: String,
      observer(v) {
        if(v) {
          this.initParseNodes(v)
        }
      }
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
    // 初始化解析节点
    initParseNodes(v) {
      const article = v.replace(/&nbsp;/g, '')
      WxParse.wxParse('article', 'html', article, this, 5)
    }
  },
})
