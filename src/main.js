import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// common CSS
import "@/assets/css/base.css"

// axios (old method)
// import axios from "axios"
// Vue.prototype.$http = axios;
// axios (new method)
import HttpServer from "@/plugins/http";
Vue.use(HttpServer);

// 导入字体图标
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false;


// 全局过滤器 - 处理日期
import moment from "moment";
Vue.filter("formatDate", (v, formatType) => {
  // return moment(v).format("YYYY-MM-DD")
  return moment(v).format(formatType)
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
