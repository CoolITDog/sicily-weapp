// pages/shopCar/shopCar.js
const app = getApp();
const restapi = require('../restapi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    choosedGoods:[],
    totalPrice:0.0,//总金额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.shopGoods);
    var goods = app.globalData.shopGoods;
    this.setData({
      goods: goods,
      choosedGoods: goods
    })
    var totalPrice = 0.0;
    for (var i in goods){
      totalPrice += goods[i].price * goods[i].buy;
    }
    this.setData({
      totalPrice: totalPrice
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
    if(this.data.totalPrice <= 0.0){
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
        amount: item.buy,
        price:item.price,
        foodName:item.name
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
  // 选择所有
  // selectAll: function (e) {
  //   console.log(e)
  // },
  // 选择
  selectOne: function (e) {
    console.log(e);
    const items = this.data.goods
    const values = e.detail.value
    const choosed =[];
    var totalPrice = 0.0;
    for (let i = 0; i < items.length;i++){
      for(let j = 0; j < values.length; j++){
        if(items[i].id == values[j]){
          choosed.push(items[i]);
          totalPrice += items[i].price * items[i].buy
        }
      }
    }
    console.log(choosed);
    this.setData({
      choosedGoods:choosed,
      totalPrice: totalPrice
    })
  },

  // 选择商品
  addFood: function (e) {
    console.log(e);
    let index = e.currentTarget.dataset.id;
    let item = e.currentTarget.dataset.item;
    var foods = this.data.goods;
    console.log(foods);
    var buy = foods[index].buy;
    var good = 'goods[' + index + '].buy';
    this.setData({
      [good]: buy + 1
    })
    item.buy = buy + 1;
    // 加入购物车
    var shopGoods = app.globalData.shopGoods;
    var flag = false;
    var k;
    for (var i in shopGoods) {
      if (shopGoods[i].id == item.id) {
        flag = true;
        k = i;
        break;
      }
    }
    if (flag) {
      shopGoods[k] = item;
    } else {
      shopGoods.push(item);
    }
    console.log(shopGoods);
    app.globalData.shopGoods = shopGoods;
  },
  // 删除商品
  delFood: function (e) {
    console.log(e);
    let index = e.currentTarget.dataset.id;
    let item = e.currentTarget.dataset.item;
    var foods = this.data.goods;
    console.log(foods);
    var buy = foods[index].buy;
    var good = 'goods[' + index + '].buy';
    if (buy - 1 == 0) {
      return;
    }
    this.setData({
      [good]: buy - 1
    })
    // 从购物车中删除
    item.buy = buy - 1
    var shopGoods = app.globalData.shopGoods;
    var k;
    for (var i in shopGoods) {
      if (shopGoods[i].id == item.id) {
        k = i;
        break;
      }
    }
    if (item.buy == 0) {
      shopGoods.splice(k, 1);
    } else {
      shopGoods[k] = item;
    }
    console.log(shopGoods);
    app.globalData.shopGoods = shopGoods;
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