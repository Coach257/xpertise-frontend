import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import gsap from 'gsap/all'

Vue.config.productionTip = false
Vue.prototype.$gsap = gsap

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
