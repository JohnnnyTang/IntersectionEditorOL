import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/userStore.js";
// import request from "../api/request.js";
import { ElMessage } from "element-plus";
import Header from "../layouts/Header.vue";
import Dashboard from "../views/Dashboard.vue";
import Home from "../views/Home.vue";
import DataVisual from "../views/DataVisual.vue";
import Tasks from "../views/Tasks.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/home",
      name: "home",
      components: {
        default: Header,
        b: Home,
      },
      meta: { requiresAuth: true }, // 设置路由元信息，表示需要登录才能访问
    },
    {
      path: "/visual",
      name: "visual",
      components: {
        default: Header,
        b: DataVisual,
      },
      meta: { requiresAuth: true }, // 设置路由元信息，表示需要登录才能访问
    },
    {
      path: "/task",
      name: "task",
      components: {
        default: Header,
        b: Tasks,
      },
      meta: { requiresAuth: true }, // 设置路由元信息，表示需要登录才能访问
    },
    {
      path: "/dashboard",
      name: "dashboard",
      components: {
        default: Header,
        b: Dashboard,
      },
      meta: { requiresAuth: true }, // 设置路由元信息，表示需要登录才能访问
    },
  ],
});

//-前置守卫路由:登录校验
router.beforeEach((to, from, next) => {
  if (to.path == "/visual" && !to.query.city) {
    console.log("route add")
    to.query = {city: "Beijing"};
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const store = useUserStore();
    //-：获取是否登录的状态
    let isLogin = store.isLogin;
    // console.log(isLogin);
    //-:访问的请求不是 login，不是reg 也没有登录
    if (!isLogin) {
      next({ name: "login", query: { redirect: to.fullPath } });
    } else if (to.name == "login" && isLogin) {
      //-:已经登录了，还在访问登录请求
      next({ name: "home" });
      ElMessage({
        message: `Welcom, ${store.userInfo.name}`,
        type: "success",
      });
    } else {
      //否则，该干啥干啥
      next();
    }
  } else {
    next();
  }
});

export default router;
