//app.js
const restapi = require('/utils/restapi.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs);
    var self = this;
    self.globalData.app = this;
    self.globalData.appId = wx.getAccountInfoSync().miniProgram.appId;
    this.login();
  },

  login: function () {
    console.log('login');
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var self = this;
        self.globalData.code = res.code;
        console.log(self.globalData.code)
        restapi.jscodeLogin(res.code, self.globalData.appId, function (response) {
          console.log(response);
          var flag = true;
          if(response.returnCode == '0' && response.data ){
            self.globalData.userInfo = response.data;
            if(response.data.mobile){
              self.globalData.mobile = response.data.mobile
              flag = false;
            }
          }
          if(flag){
            self.getUserInfo();
          }
          // self.globalData.unionId = response.data;
          
        });
      }
    })
  },

  /**
   * 小程序授权信息
   */
  getUserInfo: function () {
    var self = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res);
        if (!res.authSetting['scope.userInfo']){
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // self.userAuth();
              self.authLogin(self.globalData.wechatAuthSetting);
            }
          })
        }else{
          // self.userAuth();
          self.authLogin(self.globalData.wechatAuthSetting);
        }
      },
      fail: res => {
        console.log(res);
      }
    });
  },

  userAuth: function () {
    var self = this;
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    wx.getUserInfo({
      // withCredentials: true,
      // lang: 'zh_CN',
      success: res => {
        console.log(res);
        wx.checkSession({
          success() {
            //session_key 未过期，并且在本生命周期一直有效
            self.globalData.userInfo = res.userInfo
            self.authLogin(res);
          },
          fail() {
            // session_key 已经失效，需要重新执行登录流程
            wx.login({
              success: response => {
                appInstance.globalData.code = response['code'];
                self.authLogin(res);
              }
            })
          }
        })
      },
      fail: res => {
        console.log(res);
        // 重新授权
        wx.authorize({
          scope:'scope.userInfo',
          success(){
            self.userAuth();
          }
        })
        
      }
    });
  },

  authLogin: function (wechatAuthSetting) {
    if (!wechatAuthSetting){
      console.info("授权失败")
      return;
    }
    var self = this;
    wechatAuthSetting['code'] = self.globalData.code;
    wechatAuthSetting['appId'] = self.globalData.appId;
    console.log("wechatAuthSetting", wechatAuthSetting)
    restapi.authLogin(wechatAuthSetting, function (response) {
      console.log("authLogin", response);
      if (response.returnCode == '0' && response.data){
        self.globalData.userInfo = response.data;
        if (response.data.phone) { 
          // 已获取手机号,登录成功回调
          self.loginSuccessCallback(response.data);
        } else { 
        }
      }
    }, function () {
      console.log("authLogin request fail!")
    });
  },

  /**
  * 登录成功回调
  */
  loginSuccessCallback: function (userInfo) {
    console.log(userInfo);
    this.globalData.needLogin = false;
    this.globalData.userInfo = userInfo;
    this.globalData.mobile = userInfo.mobile;
    if (this.userInfoReadyCallback) {
      this.userInfoReadyCallback(userInfo)
    }
  },

  globalData: {
    sessionKey: 'SICILY_S_',
    userInfo: null,
    shopGoods:[],
    wechatAuthSetting: null
  }
})