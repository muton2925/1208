import { createRouter, createWebHistory } from 'vue-router'
import dashboard from '../views/dashboard.vue'
import nfv_mano_plugin from '../views/nfv_mano_plugin.vue'
const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/nfv_mano_plugin',
    name: 'nfv_mano_plugin',
    component: nfv_mano_plugin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
