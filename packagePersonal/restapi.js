const restapi = require('../utils/restapi.js');

module.exports = {
  //店家身份校验
  verify: function (merchant, success, fail){
    restapi.request('/demo-take-task/merchant/verify', merchant, { 'content-type': 'application/x-www-form-urlencoded' }, 'POST', 'json', 'text', success, fail);
  }
}