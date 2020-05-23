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
  // 在发起请求之前， 设置头部信息
  // 添加请求拦截器
  axios.interceptors.request.use(function(config) {
    // console.log(config); // config 中有请求头 headers 和 请求url 的信息
    // 在发送请求之前做些什么
    // 如果不是登录请求, 则设置token令牌值
    if (config.url !== "login") {
      // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
      const AUTH_TOKEN = localStorage.getItem("token");
      config.headers["Authorization"] = AUTH_TOKEN;
    }
    //
    return config;
  }, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  Vue.prototype._service = axios;
  // Vue.prototype.$http = () => import("axios")
};

export default HttpServer;