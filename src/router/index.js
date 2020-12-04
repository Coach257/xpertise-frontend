import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '@/views/Test.vue'
import HomePage from '@/views/HomePage.vue'
import Login from '@/views/Login.vue'
import AdminManage from '@/views/AdminManage.vue'
import Register from '@/views/Register.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
