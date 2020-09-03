//index.js
//获取应用实例
const app = getApp();
const restapi = require('../restapi.js');

Page({
  data: {
   
    lastindex:0,
    // 菜单
    list:[],
    // 商品
    goods:[],
    // 选中菜单id
    categoryId:1,
    shopGoods:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(app.globalData.userInfo);
    if(app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }else {
      app.userInfoReadyCallback=userInfo=>{
        console.log(userInfo)
      }
    }
    this.loadMenu();
    
  },
  
  // 加载菜单
  loadMenu: function(){
    var self = this;
    restapi.listCategory(function (res) {
      console.log(res);
      var list = [];
      if (res.returnCode == '0') {
        var k = 0;
        res.data.forEach(item => {
          list.push({
            id: item.id,
            name: item.name,
            back: k == 0 ? 1 : 0
          });
          k++;
        })
        self.setData({
          list: list
        })
        // 请求商品
        // self.goodsList(list[0].id);
        for(var i in list){
          // 请求商品
          self.goodsList(list[i].id);
        }
      }
    })
  },
  // 切换菜单
  chooseMenu:function(e){
    console.log(e)
    let index = e.currentTarget.dataset.index;
    let item = e.currentTarget.dataset.item;
    var lastindex = this.data.lastindex;
    if(lastindex == index){
      return;
    }
    var list = this.data.list;
    list[index].back = 1;
    list[lastindex].back = 0;
    this.setData({
      lastindex:index,
      list:list,
      categoryId: item.id
    });
  },
  // 商品列表
  goodsList:function(categoryId){
    var self = this;
    restapi.pageFood(1, 100, categoryId, function (res) {
      console.log(res);
      var goods = self.data.goods;
      if (res.returnCode == '0') {
        var k = 0;
        var foods = [];
        if (res.data.list.length > 0) {
          res.data.list.forEach(item => {
            foods.push({
              index: k++,
              id: item.id,
              categoryId: item.categoryId,
              name: item.name,
              price: item.price,
              todayRepository: item.todayRepository,
              description: item.description,
              image: item.image,
              buy: 0
            })
          })
        }
        goods[categoryId] = foods;
        // var good = 'goods[' + categoryId + ']';
        self.setData({
          goods: goods
        })
      }
    })
  },
  // 选择商品
  addFood:function(e){
    console.log(e);
    let index = e.currentTarget.dataset.id;
    let item = e.currentTarget.dataset.item;
    var foods = this.data.goods[item.categoryId];
    console.log(foods);
    var buy = foods[index].buy;
    var good = 'goods[' + item.categoryId + '][' + index+'].buy';
    this.setData({
      [good]: buy + 1
    })
    item.buy = buy + 1;
    // 加入购物车
    var shopGoods = app.globalData.shopGoods;
    var flag = false;
    var k ;
    for(var i in shopGoods){
      if(shopGoods[i].id == item.id){
        flag = true;
        k=i;
        break;
      }
    }
    if(flag){
      shopGoods[k] = item;
    }else{
      shopGoods.push(item);
    }
    console.log(shopGoods);
    app.globalData.shopGoods = shopGoods;
  },
  // 删除商品
  delFood: function(e){
    console.log(e);
    let index = e.currentTarget.dataset.id;
    let item = e.currentTarget.dataset.item;
    var foods = this.data.goods[item.categoryId];
    var buy = foods[index].buy;
    var good = 'goods[' + item.categoryId + '][' + index + '].buy';
    this.setData({
      [good]: buy - 1
    })
    // 从购物车中删除
    item.buy = buy -1
    var shopGoods = app.globalData.shopGoods;
    var k;
    for (var i in shopGoods) {
      if (shopGoods[i].id == item.id) {
        k = i;
        break;
      }
    }
    if (item.buy == 0){
      shopGoods.splice(k, 1);
    }else{
      shopGoods[k] = item;
    }
    console.log(shopGoods);
    app.globalData.shopGoods = shopGoods;
  },
  //跳转购物车
  toShopCar:function(){
    wx.navigateTo({
      url: '/pages/shopCar/shopCar',
    })
  }
})
