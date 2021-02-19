import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'


Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
    //路由发生改变时,触发
    window.document.title = to.meta.title == undefined ? '林大课表' : to.meta.title   
    next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


