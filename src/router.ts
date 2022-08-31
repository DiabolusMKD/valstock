import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import NotFound from '@/components/NotFound.vue'
import { useLoginStore } from '@/stores/login'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Valstock - Login'
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/components/Dashboard.vue'),
    meta: {
      title: 'Dashboard'
    },
  },
  {
    path: '/image/:imageId',
    name: 'ImageDetails',
    component: () => import('@/components/Details.vue'),
    meta: {
      title: 'Image Details'
    }
  },
  {
    path: '/album/:albumId',
    name: 'Album',
    component: () => import('@/components/Album.vue'),
    meta: {
      title: 'Album'
    },
  },
  {
    path:
      '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = useLoginStore().isAuthenticated
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else if (to.name === 'Login' && isAuthenticated) next({ name: 'Dashboard' })
  else next()
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - Valstock`
  }
})

export default router
