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
        path: "/user",
        name: "user",
        component: () => import("../components/users/user.vue")
      },
      {
        path: "/rights",
        name: "rights",
        component: () => import("../components/rights/rights.vue")
      },
      {
        path: "/role",
        name: "role",
        component: () => import("../components/rights/role.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
