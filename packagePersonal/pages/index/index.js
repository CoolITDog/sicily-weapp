// packagePersonal/pages/index/index.js
const request = require('../../../utils/restapi.js');

//获取应用实例
const app = getApp()
Page({

  data: {
    motto: 'Sicily Bakery',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      var userInfo = app.globalData.userInfo;
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
      console.log(app.globalData.userInfo);
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(app.globalData.userInfo);
        this.saveUser(this.data.userInfo);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.saveUser(this.data.userInfo);
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo;
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.saveUser(this.data.userInfo);
  },

  /**
   * 保存用户信息
   */
  saveUser: function(userInfo){
    var userInfoDTO = {
      wechatName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl
    }
    request.saveUser(userInfoDTO, function (res) {
      console.log(res);
    })
  },

  /**
   * 店家登录
   */
  merchantLogin: function(){
    if (app.globalData.loginStatus){
      // 已登录进入菜单页
      wx.navigateTo({
        url: "/packagePersonal/pages/menu/menu",
      })
    }else{
      // 未登录进入登录页
      wx.navigateTo({
        url: "/packagePersonal/pages/login/login",
      })
    }
  }
})