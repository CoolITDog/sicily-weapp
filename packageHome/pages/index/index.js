// packageHome/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList:[
      {
        id: 0,
        name : '软欧包'
      },
      {
        id: 1,
        name: '甜品'
      },
      {
        id: 2,
        name: '面包'
      },
      {
        id: 3,
        name: '吐司'
      },
      {
        id: 4,
        name: '饮品'
      },
    ],
    foodList1:[{
      id: 0,
      name: '星空',
      categoryId: '1',
      description: '奶酪馅',
      image:'https://wx.qlogo.cn/mmopen/vi_32/Gv8ygRKbNyRm3F91YIGpgjEh3lC6CDFLfWVeBBvMN0yrcrLt80ruRzOu23oKhqQrq2e6tmBPj4ibjxmbkXpeecA/132',
      repository: 8
    },
    {
      id: 1,
      name: '夏之雪',
      categoryId: '1',
      description: '奶酪馅',
      image: 'https://wx.qlogo.cn/mmopen/vi_32/Gv8ygRKbNyRm3F91YIGpgjEh3lC6CDFLfWVeBBvMN0yrcrLt80ruRzOu23oKhqQrq2e6tmBPj4ibjxmbkXpeecA/132',
      repository: 8
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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