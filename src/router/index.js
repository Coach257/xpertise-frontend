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
import ResultDetailPage from '@/views/ResultDetailPage.vue'
import UserPage from '@/views/UserPage.vue'
import Portal from '@/views/Portal.vue'
import SettlePage from '@/views/SettlePage.vue'
import StartPage from '@/views/StartPage.vue'
import CSStartPage from '@/views/CSStartPage.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'StartPage',
    component: StartPage
  },
  {
    path:'/home',
    name:'HomePage',
    component:StartPage
  },
  {
    path:'/cs',
    name:'CSHomePage',
    component:CSStartPage
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
    meta: {title: "管理"},
    childern: [
      {
        path: '/report-manage',
        component: () => import('../components/admin/ReportManage.vue'),
      },
      {
        path: '/application-manage',
        component: () => import('../components/admin/ApplicationManage.vue'),
      },
      {
        path: '/settle-manage',
        component: () => import('../components/admin/SettleManage.vue'),
      }
    ]
  },
  {
    path:'/navbar',
    name:'NavBarTemplate',
    component: NavBarTemplate,
  },{
    path:'/article/:articleid',
    name:'ResultDetailPage',
    component: ResultDetailPage,
  },
  {
    path: '/detail/:docid',
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
    meta: { title: "个人主页"}
  },
  {
    path: '/portal',
    name: 'Portal',
    component: Portal
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

router.beforeEach((to,from,next) => {
//   //to到哪儿  from从哪儿离开  next跳转 为空就是放行  
     if (to.path === '/login' || to.path === '/' || to.path == '/home' || to.path == '/cs') {
       //如果跳转为登录，就放行 
       next();
    } 
    else if(to.path === '/register')
      next();
    else if(to.path === '/home')
      next();
    else {
//     //取出localStorage判断
          let token = localStorage.getItem('userid');            
            if (token == null || token === '') { 
                console.log('请先登录3')    
                console.log(to.path)
                alert("请先登录！")
                //next({name:'loginView'});
              } 
              else 
                next();          
   }}
);
