import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import NotFound from './components/NotFound.vue'
import { ref } from 'vue'

// TODO: get this from store
const isAuthenticated = ref<boolean>(false)

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated.value) next({ name: 'Login' })
  else next()
})

export default router
