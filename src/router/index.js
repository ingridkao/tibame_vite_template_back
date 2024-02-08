import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 此結構僅demo用，有各種路由結構寫法
// 權限做法以下是最好懂但也最不安全，另有其他架構
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首頁',
        role: ['admin', 'editor']
      },
      children: [
        {
          // 当 / 匹配成功
          // dashboard 将被渲染到 home 的 <router-view> 内部
          path: '',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
          meta: {
            title: '儀表板',
            role: ['admin', 'editor']
          },
        },
        {
          // 当 /products 匹配成功
          // products 将被渲染到 home 的 <router-view> 内部
          name: 'products',
          path: 'products',
          component: () => import('../views/ProductsView.vue'),
          meta: {
            title: '商品管理',
            role: ['admin', 'editor']
          },
        },
        {
          // 当 /user 匹配成功
          // user 将被渲染到 home 的 <router-view> 内部
          name: 'user',
          path: 'user',
          component: () => import('../views/UserView.vue'),
          meta: {
            title: '會員管理',
            role: ['admin']
          },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: '登入',
        role: ['admin', 'editor']
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        title: '註冊',
        role: ['admin', 'editor']
      }
    },
    // 404頁面：沒有被配置的路由都會去NotFound
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        title: '404 NotFound',
        role: ['admin', 'editor']
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
const isAuthenticated = (roles) => {
  const userToken = localStorage.getItem("userToken")
  const userData = localStorage.getItem("userData")
  if(userToken){
    const userStorageData = JSON.parse(userData)
    // 依據後端規則來撰寫
    // localstorage有東西，已驗證＋帳號啟用＋符合頁面權限
    // if(userStorageData &&userStorageData.validation == 1 && roles.includes(userStorageData.role)){
    if(userStorageData && userStorageData.validation == 1){
      return true
    }else{
      return false
    }
  }else{
    return false
  }
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

  }else if ( !isAuthenticated(to.meta.role) && to.name !== 'login') {
    // 检查用户是否已登录 && 避免進入登入頁面造成无限重定向
    // 将用户重定向到登录页面
    return { name: 'login' }
  }
})

export default router
