import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import ClassTable from "../views/ClassTable.vue";
import Person from "../views/Person.vue";
import Other from "../views/Other.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "主页",
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: "/About",
    name: "About",
    component: About,
    meta: {
      title: "关于页面",
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: "/ClassTable",
    name: "ClassTable",
    component: ClassTable,
    meta: {
      title: "班级课表",
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: "/Person",
    name: "Person",
    component: Person,
    meta: {
      title: "个人课表",
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: "/Other",
    name: "Other",
    component: Other,
    meta: {
      title: "扩展功能",
      keepAlive: true // 需要被缓存
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
