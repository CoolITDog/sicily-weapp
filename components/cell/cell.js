// components/cell/cell.js
import {
  haveEmoji,
  replaceEmoji
} from '../../utils/util.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label: String,
    required: Boolean,
    type: null,
    maxlength: Number,
    pickerData: Array,
    placeholder: String,
    value: {
      type: String,
      value: '',
      observer: function(n, o) {
        this.setData({
          value: n
        })
      }
    },
    hideArrow: Boolean,
    inputAlign: {
      type: String,
      value: 'left'
    },
    disabled: Boolean,
    pickerFlag: {
      type: Boolean,
      value: true
    },
    labelSelf:null,
    inputType:null,
    iconSlot:null
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeIndex: 0,
    subTypeIndex: 0,
    pickerValue: [0, 0],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change(e) {
      let index = e.detail.value
      this.setData({
        pickerValue: index
      })
      this.triggerEvent('click', {
        type: this.data.type,
        value: index
      })
    },
    click(e) {
      if(this.properties.type == 'input') {
        this.setData({
          focus:true
        })
      } else{
        this.triggerEvent('click')
      }
      
    },
    input(e) {
      let value = e.detail.value
      if (haveEmoji(value)) value = replaceEmoji(value)
      this.triggerEvent('input', {
        type: this.data.type,
        value: value
      })
    },
    blur(){
      this.setData({
        focus:false
      })
    },
    bindcolumnchange(e) {
      console.log(e)
      if (e.detail.column == 0) {
        wx.showLoading({
          title: '',
        })
      }
      this.triggerEvent('pickerchange', e.detail)
    }
  }
})