import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from '@/plugins/nprogress'
import i18n from '@/i18n/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue'),
    meta: {
      title: '首页',
      i18nKey: 'router.Home'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.i18nKey) {
    document.title = i18n.global.t(to.meta.i18nKey as string)
  } else {
    document.title = to.meta.title as string
  }

  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
