import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VueCookies from 'vue-cookies'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/userProfile',
      name: 'userProfile',
      meta: {
        requiresAuth: true // 是否要檢查權限
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UserProfileView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  console.log('beforeEach')
  const UserCookie = VueCookies.get('User-Id')
  console.log(UserCookie)
  console.log('UserCookie')
  if (to.meta.requiresAuth && !UserCookie) {
    // 使用者未登入，跳轉首頁
    console.log('未登入')
    next('/')
  } else {
    //已登入或不需要驗證
    console.log('已登入')
    next()
  }
})

export default router
