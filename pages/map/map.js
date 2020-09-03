// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: {
      name: '',
      phone: '',
      address: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  input(e) {
    console.log(e);
    let target = e.currentTarget.dataset.target
    let value = e.detail.value
    this.setData({
      [`obj.${target}`]: value
    })
    this.check()
  },
 
  check() {
    let obj = this.data.obj
    let flag = Object.values(obj).findIndex(i => !i)
    this.setData({
      flag: flag == -1
    })
  },
  // 确定添加
  done() {
    if (!this.data.flag) return
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})