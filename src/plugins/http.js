// HttpServer 插件

import axios from "axios";

let HttpServer = {};

HttpServer.install = (Vue) => {
  // 1. 添加全局方法或 property
  // Vue.myGlobalMethod = function () {
  //   // 逻辑...
  // }
  //
  // // 2. 添加全局资源
  // Vue.directive('my-directive', {
  //   bind (el, binding, vnode, oldVnode) {
  //     // 逻辑...
  //   }
  //   ...
  // })
  //
  // // 3. 注入组件选项
  // Vue.mixin({
  //   created: function () {
  //     // 逻辑...
  //   }
  //   ...
  // })

  // 4. 添加实例方法
  // 设置 baseUrl
  axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
  Vue.prototype.$http = axios;
  // Vue.prototype.$http = () => import("axios")
};

export default HttpServer;