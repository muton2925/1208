import { createRouter, createWebHistory } from 'vue-router'
import dashboard from '../views/dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: dashboard
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
