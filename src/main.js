import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {gsap, ScrollTrigger} from 'gsap/all'
import {Message, MessageBox, Loading} from 'element-ui';
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
import axios from 'axios';
import '@/assets/fonts/font.scss';
import echarts from 'echarts'
import 'echarts-gl'
import VueClipboard from 'vue-clipboard2'
import VueWechatTitle from 'vue-wechat-title'



Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(ElementUI);
Vue.use(VueClipboard);
Vue.use(VueWechatTitle);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
Vue.prototype.$gsap = gsap
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts


gsap.registerPlugin(ScrollTrigger)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})