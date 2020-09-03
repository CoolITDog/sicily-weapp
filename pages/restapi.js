const restapi = require('../utils/restapi.js');

module.exports = {
  
  /**
   * 首页菜单列表
   */
  listCategory:function(success, fail){
    restapi.req('/sicily-web/home/listCategory', {}, {}, 'GET', 'json', 'text', success);
  },
  /**
   * 菜单下的商品列表
   */
  pageFood: function (pageNum, pageSize, categoryId, success, fail){
    restapi.req('/sicily-web/home/pageFood', { pageNum: pageNum, pageSize: pageSize, categoryId: categoryId}, {}, 'GET', 'json', 'text', success);
  },
  /**
   * 下单
   */
  generateOrder:function(order, success, fail){
    restapi.req('/sicily-web/shop/generateOrder', JSON.stringify(order), { 'content-type': 'application/json' }, 'POST', 'json', 'text', success);
  }
}