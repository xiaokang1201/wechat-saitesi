// components/describe-credentials/describe-credentials.ts
const { login } = require("../../utils/api/request")
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 1 退款 2 退款退货
    type: {
      type: Number,
      value: 2
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    picList: [],//图片列表
  },

  /**
   * 组件的方法列表
   */
  methods: {  
    textareaChange({ detail: { value } }: Detail<string>) {
      this.triggerEvent('textareaChange', value)
    },
    // 图片列表 删除图片
    deletePic({ currentTarget: { dataset: { index } } }: Index) {
      const picList = this.data.picList
      picList.splice(index, 1)
      this.setData({ picList })
    },
    // 点击预览图片
    previewImageClick({ currentTarget: { dataset: { img_src } } }: CurrentTarget<string>) {
      getApp().tool.previewImage(this.data.picList, img_src)
    },
    // 点击上传图片
    uploadImgClick() {
      if(this.data.picList.length >= 3) return getApp().tool.alert("最多上传三张", 1000, 2)

      getApp().tool.chooseImage().then(({ tempFilePaths }: Body<string>) => {
        getApp().tool.uploadFiles(tempFilePaths, getApp().api.upload()).then((res: []) => {
          const picList = this.data.picList.concat(res)
          this.triggerEvent('uploadImg', picList)
          this.setData({ picList })
        })
      })
    },
  },
  
  lifetimes: {
    attached() {
      login()
    }
  }
})
