// pages/shopCar/shopCar.js
const app = getApp();
const restapi = require('../restapi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    choosedGoods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.shopGoods);
    this.setData({
      goods: app.globalData.shopGoods,
      choosedGoods: app.globalData.shopGoods
    })
  },

  // 生成订单
  generateOrder: function(){
    // 判断是否授权
    if (!app.globalData.userInfo){
      wx.navigateTo({
        url: '/pages/common/login/login',
      })
      return;
    }
    var choosedGoods = this.data.choosedGoods;
    var price = 0.0;
    var foodNum = 0;
    var foodList = [];
    choosedGoods.forEach(item=>{
      price += parseFloat(item.price * item.buy);
      foodNum += parseInt(item.buy);
      foodList.push({
        foodId:item.id,
        amount: item.buy
      })
    });
    var order = {
      attainWay:1,
      price: price,
      classNum: choosedGoods.length,
      foodNum: foodNum,
      foodList: foodList,
      userId: 1
    }
    restapi.generateOrder(order, function(res){
      console.log(res);
      if(res.returnCode == '0'){
        wx.navigateTo({
          url: '/pages/order/order?id=' + res.data.id,
        })
      }
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

})