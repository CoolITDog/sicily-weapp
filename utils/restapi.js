// env:dev
const domain = 'http://192.168.3.82:8882';
// env:prod
// const domain = 'https://sicily.com.cn';

const app = getApp();

/**
 * 通用请求
 * url: 请求路径
 * data： 数据参数
 * header: 请求头
 * method: 请求类型，默认GET，需大写
 * dataType: 返回数据格式，默认json
 * responseType: 响应数据类型，默认text
 * success: 响应成功回调函数
 */
function request(url, data, header, method, dataType, responseType, success, fail) {
  //埋点
  var requestStartTime = Date.now();
  wx.showNavigationBarLoading();
  // 请求超时时间默认60秒
  var timeout = 60000;
  if (header && header['request-timeout']) {
    timeout = header['request-timeout'];
    delete header['request-timeout'];
  }
  // 设置请求头，携带Cookie信息
  setHeader(header);
  var that = this;
  wx.request({
    url: domain + url,
    data: data,
    header: header,
    timeout: timeout,
    method: method,
    dataType: dataType,
    responseType: responseType,
    success: function (response) {
      // 未登录
      setHeader(response.header);
      if (response.statusCode == 401) {
        // 跳转到正在登录页面
        wx.navigateTo({
          url: '/pages/auth/login/login'
        });
      } else if (response.statusCode == 200) {
        success(response.data);
      } else {
        if (fail && 'function' === typeof fail) {
          fail();
        }
      }
    },
    fail: function (error) {
      console.log('error:' + JSON.stringify(error));
      if (fail && 'function' === typeof fail) {
        fail();
      }
    },
    complete: function (data) {
      wx.hideNavigationBarLoading();
    }
  });
}

/**
 * 设置请求头Cookie信息
 * header 源请求头信息
 * return 包含Cookie信息header
 */
function setHeader(header) {
  var app = getApp();
  // if (app && app.globalData.extConfig.merchantId) {
  //   header['MerchantId'] = app.globalData.extConfig.merchantId;
  // }
  var sessionKey = 'JSESSIONID';
  // 本地获取存储的sessionId
  var sessionId = wx.getStorageSync(sessionKey);
  if (sessionId) {
    // 优先从本地获取sessionId
    header['Cookie'] = [sessionKey, '=', sessionId].join('');
    return header;
  }
  // 本地没有，则从服务器获取
  var cookies = header['Set-Cookie'];
  if (cookies) {
    var re = new RegExp("" + sessionKey + "\=([^\;]*)", "ig");
    sessionId = ((cookies.match(re)) ? (cookies.match(re)[0].substr(sessionKey.length + 1)) : null);
    if (sessionId) {
      // 从cookie中获取sessionId存储到本地
      wx.setStorageSync(sessionKey, sessionId);
    }
  }
  if (sessionId) {
    header['Cookie'] = [sessionKey, '=', sessionId].join('');
  }
  return header;
}

function relogin() {

}

module.exports = {

  /**
   * 域名
   */
  domain: domain,

  /**
   * 请求接口封装
   */
  req: request,

  /**
   * 获取会话ID
   */
  getSessionId: function () {
    return wx.getStorageSync(djSessionId);
  },

  /**
   * 利用jscode登录
   * code: 登录凭证
   * appId: 应用ID
   * success: 成功返回处理 
   */
  jscodeLogin: function (code, appId, success) {
    request('/sicily-web/login/jsCode/login', { code: code, appId: appId }, {}, 'GET', 'json', 'text', success);
  },
  /**
   * 授权登录
   * wechatAuthSetting：微信授权信息
   */
  authLogin: function (wechatAuthSetting, success, fail) {
    request('/sicily-web/login/auth/login', JSON.stringify(wechatAuthSetting), { 'content-type': 'application/json' }, 'POST', 'json', 'text', success, fail);
  },

  /**
   * 授权手机号
   * wechatAuthSetting：微信授权信息
   */
  authPhone: function (wechatAuthSetting, success) {
    request('/sicily-web/login/auth/phone', JSON.stringify(wechatAuthSetting), { 'content-type': 'application/json' }, 'POST', 'json', 'text', success);
  },

}