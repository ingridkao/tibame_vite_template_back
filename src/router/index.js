import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 此結構僅demo用，有各種路由結構寫法
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首頁',
      },
      children: [
        {
          // 当 /dashboard 匹配成功
          // dashboard 将被渲染到 home 的 <router-view> 内部
          path: '',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        {

          // 当 /locomotive 匹配成功
          // locomotive 将被渲染到 home 的 <router-view> 内部
          path: 'locomotive',
          name: 'locomotive',
          component: () => import('../views/LocomotiveView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: '登入',
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        title: '註冊',
      }
    },
    // 404頁面：沒有被配置的路由都會去NotFound
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        title: '404',
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    // https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
    return { top: 0 }
  },
})

// 登入最基本判斷，也是最不安全的做法
// 未來可以再深入研究，關鍵字Authentication
// 並加入動態路由https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html
const isAuthenticated = () => {
  const userToken = localStorage.getItem("userToken")
  return userToken? true: false
}

router.beforeEach((to) => {
  // 加入頁籤標題
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  
  // 參考文件
  // https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
  if(to.name == 'register' ){
    return

  }else if ( !isAuthenticated() && to.name !== 'login') {
    // 检查用户是否已登录 && 避免无限重定向
    // 将用户重定向到登录页面
    console.log(1);
    return { name: 'login' }
  }
})

export default router
