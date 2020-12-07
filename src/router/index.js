import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '@/views/Test.vue'
import HomePage from '@/views/HomePage.vue'
import Login from '@/views/Login.vue'
import AdminManage from '@/views/AdminManage.vue'
import Register from '@/views/Register.vue'
import NavBarTemplate from '@/components/template/NavBarTemplate.vue'
import Detail from '@/views/Detail.vue'
import UserInfo from '@/views/UserInfo.vue'
import UserPage from '@/views/UserPage.vue'
import Portal from '@/views/Portal.vue'
import SettlePage from '@/views/SettlePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {title: "登录"}
  },
  {
    path: '/admin',
    name: 'AdminManage',
    component: AdminManage,
    meta: {title: "登录"}
  },
  {
    path:'/navbar',
    name:'NavBarTemplate',
    component: NavBarTemplate,
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
  },  
  {
    path: '/userinfo',
    name: 'userInfo',
    component: UserInfo,
    meta: {title: "个人信息"}
  },
  {
    path: '/userpage/:userid',
    name: 'UserPage',
    component: UserPage,
    meat: { title: "个人主页"}

  },
  {
    path: '/portal',
    name: 'Portal',
    component: Portal
  },
    meta: { title: "个人主页"}
  },
  {
    path: '/settle',
    name: 'SettlePage',
    component: SettlePage,
    meta: {title: "申请入驻"}
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
