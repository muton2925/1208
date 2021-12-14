import { createRouter, createWebHistory } from 'vue-router'
import dashboard from '../views/dashboard.vue'
import nfv_mano_plugin from '../views/nfv_mano_plugin.vue'
import VNF_Template from '../views/VNF_Template.vue'
import NSD_Template from '../views/NSD_Template.vue'
import NRM_Template from '../views/NRM_Template.vue'
import NSS_Template from '../views/NSS_Template.vue'
import NSS_Instance from '../views/NSS_Instance.vue'
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
  },
  {
    path: '/VNF_Template',
    name: 'VNF_Template',
    component: VNF_Template
  },
  {
    path: '/NSD_Template',
    name: 'NSD_Template',
    component: NSD_Template
  },
  {
    path: '/NRM_Template',
    name: 'NRM_Template',
    component: NRM_Template
  },
  {
    path: '/NSS_Template',
    name: 'NSS_Template',
    component: NSS_Template
  },
  {
    path: '/NSS_Instance',
    name: 'NSS_Instance',
    component: NSS_Instance
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
