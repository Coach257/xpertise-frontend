import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '@/views/Test.vue'
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
import Affiliation  from '@/views/Affiliation'
import Author from '@/views/Author'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    redirect: '/home'
  },
  {
    path:'/home',
    name:'HomePage',
    component:StartPage,
    meta: {title: "XpertiseScholar 首页"}
  },
  {
    path:'/cs',
    name:'CSHomePage',
    component:CSStartPage,
    meta: {title: "XpertiseScholar 计算机科学"}
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {title: "XpertiseScholar 登录"}
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {title: "XpertiseScholar 注册"}
  },
  {
    path: '/admin',
    redirect: '/admin/request-manage',
    name: 'AdminManage',
    component: AdminManage,
    meta: {title: "XpertiseScholar 管理"},
    children: [
      {
        name: 'ReportManage',
        path: 'report-manage',
        component: () => import('../components/admin/ReportManage.vue'),
      },
      {
        name: 'RequestManage',
        path: 'request-manage',
        component: () => import('../components/admin/RequestManage.vue'),
      },
    ]
  },
  {
    path: '/navbar',
    name: 'NavBarTemplate',
    component: NavBarTemplate,
  }, {
    path: '/article/:articleid',
    name: 'ResultDetailPage',
    component: ResultDetailPage,
    meta: {title: "XpertiseScholar 文章"}
  },
  {
    path: '/detail/:type/:docid',
    name: 'Detail',
    component: Detail,
    meta: {title: "XpertiseScholar 文章详情"},
  },
  {
    path: '/userinfo',
    name: 'userInfo',
    component: UserInfo,
    meta: {title: "XpertiseScholar 个人信息"},
    children: [
      {
        name: 'MessageModify',
        path: 'message-modify',
        component: () => import('../components/user/MessageModify.vue'),
      },
      {
        name: 'MyCollection',
        path: 'my-collection',
        component: () => import('../components/user/MyCollection.vue'),
      },
      {
        name: 'MessageCentre',
        path: 'message-centre',
        component: () => import('../components/user/MessageCentre.vue'),
      }
    ]
  },
  {
    path: '/userpage/:userid',
    name: 'UserPage',
    component: UserPage,
    meta: {title: "XpertiseScholar 个人主页"}
  },
  {
    path: '/portal/:authorId',
    name: 'Portal',
    component: Portal,
    meta: {title: "XpertiseScholar 作者主页"}
  },
  {
    path: '/author/:type/:authorId',
    name: 'Author',
    component: Author,
    meta: {title: "XpertiseScholar 作者主页"}
  },
  {
    path: '/settle',
    name: 'SettlePage',
    component: SettlePage,
    meta: {title: "XpertiseScholar 申请入驻"}
  },
  {
    path: '/affiliation/:affId',
    name: Affiliation,
    component: Affiliation,
    meta: {title: "XpertiseScholar 机构详情页"}
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router


router.beforeEach((to, from, next) => {
// //   //to到哪儿  from从哪儿离开  next跳转 为空就是放行
//      if (to.path === '/login' || to.path === '/' || to.path ==='/home' || to.path ==='/cs') {
//        //如果跳转为登录，就放行
//        next();
//     }
//     else if(to.path === '/register')
//       next();
//     else if(to.path === '/home')
//       next();
//     else {
// //     //取出localStorage判断
//           let token = localStorage.getItem('userid');
//             if (token == null || token === '') {
//                 console.log('请先登录3')
//                 console.log(to.path)
//                 alert("请先登录！")
//                 //next({name:'loginView'});
//               }
//               else
//                 next();
//    }
  next()
  }

);
