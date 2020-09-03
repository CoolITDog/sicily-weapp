// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:true,
    addressList:[
      {
        accountId: 91709599,
        address: "广东省深圳市南山区桃园路南头深圳市南山区人民政府(桃园路北)",
        areaName: "南山区",
        cityName: "深圳市",
        createdBy: "18373184605",
        lat: 22.25,
        lng: 113.83773,
        name: "w",
        phone: "13883838866",
        provinceName: "广东省",
        updatedBy: "13883838866"
      },
      {
        accountId: 91709599,
        address: "广东省深圳市南山区桃园路南头深圳市南山区人民政府(桃园路北)",
        areaName: "南山区",
        cityName: "深圳市",
        createdBy: "18373184605",
        lat: 22.25,
        lng: 113.83773,
        name: "w",
        phone: "13883838866",
        provinceName: "广东省",
        updatedBy: "13883838866"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 选择地址
  choose(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    this.setData({
      count: index
    })
    if (this.data.backPaid) {
      util.navigateBack({
        'addressCount': index,
        'addressInfo': null,
        'first': true
      })
    }
  },

  // 添加地址
  addOrEditAddress:function(){
    wx.navigateTo({
      url: '/pages/map/map',
    })
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