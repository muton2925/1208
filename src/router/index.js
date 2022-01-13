import { createRouter, createWebHistory } from 'vue-router'
import dashboard from '../views/dashboard.vue'
const routes = [
  {
    path: '/',
    component: dashboard
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/nfv_mano_plugin',
    name: 'nfv_mano_plugin',
    component: () => import(/* webpackChunkName: "nfv_mano_plugin" */ '../views/nfv_mano_plugin.vue')
  },
  {
    path: '/VNF_Template',
    name: 'VNF_Template',
    component: () => import(/* webpackChunkName: "VNF_Template" */ '../views/VNF_Template.vue')
  },
  {
    path: '/NSD_Template',
    name: 'NSD_Template',
    component: () => import(/* webpackChunkName: "NSD_Template" */ '../views/NSD_Template.vue')
  },
  {
    path: '/NRM_Template',
    name: 'NRM_Template',
    component: () => import(/* webpackChunkName: "NRM_Template" */ '../views/NRM_Template.vue')
  },
  {
    path: '/NSS_Template',
    name: 'NSS_Template',
    component: () => import(/* webpackChunkName: "NSS_Template" */ '../views/NSS_Template.vue')
  },
  {
    path: '/NSS_Instance',
    name: 'NSS_Instance',
    component: () => import(/* webpackChunkName: "NSS_Instance" */ '../views/NSS_Instance.vue')
  },
  {
    path: '/nssi_topology',
    name: 'nssi_topology',
    component: () => import(/* webpackChunkName: "nssi_topology" */ '../views/nssi_topology.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
