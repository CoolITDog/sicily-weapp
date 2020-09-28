// pages/order/order.js
const app = getApp();
let filter = require('../../utils/filter.js');
const restapi = require('../restapi.js');
Page(
  /*filter.identifyFilter(*/{

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo:{
      orderNo:120938438791234,
      attainWay:2,
      price:85.50,
      class_num:3,
      food_num:5,
      orderStatus:1,
      payStatus:1
    },
    foodList:[
      {
        id:0,
        name:'软欧',
        price:8.55,
        amount:1
      },
      {
        id:1,
        name: '美式',
        price: 21,
        amount: 2
      },
      {
        id:2,
        name: '酸奶',
        price: 10,
        amount: 2
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var id = options.id;
    //获取订单详情
    var self = this;
    restapi.getDetail(id, function(res){
      console.log(res);
      if(res.returnCode == '0'){
        self.setData({
          orderInfo:res.data,
          foodList:res.data.foods
        })
      }
    })
  },

  toPay:function(){
    console.log(app.globalData.userInfo);
    // 是否授权
    if (!app.globalData.userInfo){
      wx.navigateTo({
        url: 'pages/common/login/login',
      });
      return;
    }
    // TODO 检验订单是否有效
    var orderInfo = this.data.orderInfo;
    var payment = {
      orderId: orderInfo.id,
      orderCode: orderInfo.orderNo,
      payPrice: orderInfo.price
    }
    var self = this;
    // 支付
    restapi.invokeWxUnifiedorder(payment, function (response){
      console.log(response);
      if (response.returnCode == '0') {
        wx.showLoading("正在请求支付...");
        self.requestWxPay(response.data);
      }
    })
  },

  /**
   * 请求微信支付
   */
  requestWxPay: function (payOrder) {
    let self = this;
    console.log("payOrder", payOrder)
    wx.requestPayment({
      timeStamp: payOrder.timeStamp,
      nonceStr: payOrder.nonceStr,
      package: "prepay_id=" + payOrder.prepayId,
      signType: payOrder.signType,
      paySign: payOrder.paySign,
      success: function (res) {
        console.log("支付成功", res);
        wx.hideLoading();
        let orderId = self.data.orderInfo.id;
        let source = self.data.source;
        let shopId = self.data.shopId;
        console.log(orderId);
        wx.navigateTo({
          url: `pages/paySuccess/paySuccess?orderId=${orderId}`
        })
      },
      fail: function (res) {
        console.log("res", res)
        wx.hideLoading();
        if (res.errMsg == 'requestPayment:fail cancel') {
          app.showMessage("取消支付")
        } else {
          app.showMessage("支付异常，请重新支付~");
        }
        console.log("支付失败");
        console.log(res);
      }
    })
  },

  //选择方式
  radioChange:function(e){
    console.log(e);
    var type = e.detail.value
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
})/*)*/