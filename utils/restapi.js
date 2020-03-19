const domain = 'http://192.168.3.82:8881';

const app = getApp();
// 会话前缀
const JSessionId = 'JSESSIONID';
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
function request(url, data, header, method, dataType, responseType, success, fail){
  wx.showNavigationBarLoading();
  // 设置请求头，携带Cookie信息
  setHeader(header);
  var that = this;
  wx.request({
    url: domain + url,
    data: data,
    header: header,
    method: method,
    dataType: dataType,
    responseType: responseType,
    success: function (response) {
      // 未登录
      setHeader(response.header);
      if (response.statusCode == 200) {
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

  /**
 * 设置请求头Cookie信息
 * header 源请求头信息
 * return 包含Cookie信息header
 */
  function setHeader(header) {
    // 本地获取存储的sessionId
    var sessionId = wx.getStorageSync(JSessionId);
    var cookies = header['Set-Cookie'];
    if (cookies) {
      var re = new RegExp("" + JSessionId + "\=([^\;]*)", "ig");
      sessionId = ((cookies.match(re)) ? (cookies.match(re)[0].substr(JSessionId.length + 1)) : null);
      if (sessionId) {
        // 从cookie中获取sessionId存储到本地
        wx.setStorageSync(JSessionId, sessionId);
      }
    }
    if (sessionId) {
      header['Cookie'] = [JSessionId, '=', sessionId].join('');
    }
    return header;
  }
}

module.exports = {
  domain:domain,
  request: request,

  /**
   * 换取openId
   */
  getCode: function (code, success, fail){
    request('/demo-take-task/login/getCode', { code:code}, {}, 'GET', 'json', 'text', success, fail);
  },
// 'content-type': 'application/x-www-form-urlencoded' 

  /**
   * 保存用户信息
   */
  saveUser: function (userInfoDTO, success, fail){
    request('/demo-take-task/login/saveUser', userInfoDTO, { 'content-type': 'application/x-www-form-urlencoded' }, 'POST', 'json', 'text', success, fail);
  }
}