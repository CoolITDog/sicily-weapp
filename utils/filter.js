const app = getApp();
const restapi = require('/restapi.js');
function identifyFilter(pageObj){
  if(pageObj.onShow){
    let _onShow = pageObj.onShow;
    pageObj.onShow = function(){
      identityCheck(()=>{
        let currentInstance = getPageInstance();
        _onShow.call(currentInstance);
        
      }, ()=>{
        wx.redirectTo({
          url: '/pages/common/login/login',
        });
      })
    }
  }
  return pageObj;
}

function identityCheck(success, fail){
  // 获取用户信息
  wx.getSetting({
    success: res => {
      console.log(res);
      wx.login({
        success: response => {
          app.globalData.code = response.code;
          if (res.authSetting['scope.userInfo']) {
            userAuth(success, fail);
          } else {
            // 开启新的授权检测任务
            checkAuthInterval();
            // 弹出授权窗口
            fail(true);
          }
        },
        fail:response =>{
          console.log(response);
        }
      })
    },
    fail: res => {
      console.log(res);
    }
  });
}

/**
 * 用户授权
 */
function userAuth(success, fail){
  let currentInstance = getPageInstance();
  // 已授权微信用户信息
  if (app.globalData.authUserInfo) {
    console.log(app.globalData.authUserInfo);
    // 已授权手机号
    if (app.globalData.authPhone) {
      console.log(app.globalData.authPhone);
      // 停掉检测任务
      clearInterval(currentInstance.data.authInterval);
      // 授权成功
      success();
    } else {
      // 开启授权检测任务
      checkAuthInterval();
      // 未授权手机号
      fail(false);
    }
    return;
  }
  // 开启新的授权检测任务
  checkAuthInterval();
  console.log(app.globalData.code);
  restapi.jscodeLogin(app.globalData.code, app.globalData.appId, function (response) {
    console.log(response);
    switch (response.returnCode) {
      case '0': // 获取微信用户信息成功
        app.globalData.userInfo = response.data;
        app.globalData.authUserInfo = true;
        if (response.data.mobile) { // 已获取手机号
          app.globalData.authPhone = true;
          // 登录成功回调
          app.loginSuccessCallback(response.data);
          success();
        } else { // 未获取手机号，授权获取
          fail(false);
        }
        break;
      case '-1':
        // 获取微信用户信息为空，授权获取
        fail(true);
        break;
      default:
        wx.showToast({
          title: response.message
        })
    }
  });
}

/**
 * 轮询检测授权
 */
function checkAuthInterval() {
  let currentInstance = getPageInstance();
  // 停掉原有检测任务
  clearInterval(currentInstance.data.authInterval);

  var authInterval = setInterval(function () {
    // 已授权微信用户信息
    if (app.globalData.authUserInfo) {
      // 已授权手机号
      if (app.globalData.authPhone) {
        // 关闭授权窗口
        currentInstance.setData({
          authToast: false
        });
        console.log("clear interval:" + currentInstance.data.authInterval);
        clearInterval(currentInstance.data.authInterval);
        // 登录成功回调
        app.loginSuccessCallback(app.globalData.userInfo);
      } else {
        // 切换到手机号授权窗口
        currentInstance.setData({
          authType: false
        });
      }
    }
  }, 1000);
  // 保存任务ID
  currentInstance.setData({
    authInterval: authInterval
  });
}

function getPageInstance() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

exports.identifyFilter = identifyFilter;