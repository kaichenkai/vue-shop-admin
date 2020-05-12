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


Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
