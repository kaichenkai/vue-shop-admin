import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "root",
    redirect: { name: "home" }
  },
  {
    path: "/login",
    name: "login",
    // component: import("../views/Login.vue")  // 错误写法: template or render function not defined.
    component: () => import("../views/Login.vue")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
    redirect: { name: "rights" },
    children: [
      {
        path: "/users",
        name: "users",
        component: () => import("../components/users/user.vue")
      },
      {
        path: "/rights",
        name: "rights",
        component: () => import("../components/rights/rights.vue")
      },
      {
        path: "/roles",
        name: "roles",
        component: () => import("../components/rights/role.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

import {Message} from "element-ui";
//配置路由导航守卫 (前置守卫)
//在路由配置生效之前, 统一判断 token
router.beforeEach((to, from, next) => {
  //to: 将要到达的路由
  //from: 从哪儿来
  //next(): 放行
  // console.log("to", to);
  // console.log("from", from);
  if (to.path !== "/login") { // 不是访问login页面
    // 如果没有 token 值, 就不渲染 home 组件
    // new Vue() 之前触发
    const token = localStorage.getItem("token");
    if (!token) { //未登录
      Message.warning("请先登录");
      // next("/login")
      router.push({name: 'login'});
      return
    }
  }
  //已登录, 放行
  next();
});

export default router;
