// packagePersonal/pages/login/login.js
const md5Util = require('../../../utils/md5.js');
const restapi = require('../../restapi.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    account:null,
    password:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo
    })
    
  },
  /** 输入 */
  bindinput(e) {
    let target = e.currentTarget.dataset.name
    let value = target != 'mileage' ? /^[A-Za-z0-9]+$/.test(e.detail.value) ? e.detail.value : '' : e.detail.value
    this.setData({
      [target]: value,
    })
  },

  /** 身份验证 */
  merchantVerify: function(){
    console.log('verify');
    var password = md5Util.hexMD5(this.data.password);
    console.log(password);
    var merchant = {
      phone: this.data.account,
      password: password
    }
    restapi.verify(merchant, function(res){
      console.log(res);
      if(res.returnCode == '0'){
        // 校验成功
        app.globalData.loginStatus = true;
        wx.showToast({
          title: '验证成功！'
        })
        wx.navigateTo({
          url: "/packagePersonal/pages/menu/menu",
        })
      }else{
        wx.showToast({
          title: '账号或密码有误，验证失败！',
          icon: 'none'
        })
      }
    })
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