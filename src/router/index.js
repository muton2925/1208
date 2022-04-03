import { createRouter, createWebHistory } from 'vue-router'
import dashboard from '../views/dashboard.vue'
const routes = [
  // {
  //   path: '/',
  //   component: dashboard
  // },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { requireAuth: true },
    component: dashboard
  },
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: '/nfv_mano_plugin',
    name: 'nfv_mano_plugin',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "nfv_mano_plugin" */ '../views/nfv_mano_plugin.vue')
  },
  {
    path: '/VNF_Template',
    name: 'VNF_Template',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "VNF_Template" */ '../views/VNF_Template.vue')
  },
  {
    path: '/NSD_Template',
    name: 'NSD_Template',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "NSD_Template" */ '../views/NSD_Template.vue')
  },
  {
    path: '/NRM_Template',
    name: 'NRM_Template',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "NRM_Template" */ '../views/NRM_Template.vue')
  },
  {
    path: '/NSS_Template',
    name: 'NSS_Template',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "NSS_Template" */ '../views/NSS_Template.vue')
  },
  {
    path: '/NSS_Instance',
    name: 'NSS_Instance',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "NSS_Instance" */ '../views/NSS_Instance.vue')
  },
  {
    path: '/nssi_topology',
    name: 'nssi_topology',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "nssi_topology" */ '../views/nssi_topology.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "nssi_topology" */ '../views/setting.vue')
  },  
  {
    path: '/*',
    // redirect: '*',
    // hidden: true,
    component: () => import(/* webpackChunkName: "nssi_topology" */ '../views/setting.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeResolve(async(to, from, next) => {
  // 看看 to 和 from 兩個 arguments 會吐回什麼訊息
  console.log('to: ', to.name)
  console.log('from: ', from.name)
   // 獲取sessionStorage當中的login資訊並取得token
  const info = sessionStorage.getItem('token');
  if(to.name == 'login' && info){
    // next({ name: 'dashboard' })
    console.log(to.name == 'login' && info)
  }
  if (to.meta.requireAuth) {
    if (info) {
      const token = JSON.parse(info).token
      // 如果token不為空，且確實有這個欄位則讓路由變更
      if (token.length > 0 || token !== undefined) {
        next() 
      } else {
        // 未通過則導回login頁面
        next({ name: 'login' })
      }
    } else{
      next({ name: 'login' })
    }
  } else {
    if(info){
      if(to.name == 'login'){
        next({ name: 'dashboard' })
      }
    }else{
      next()
    }
  }
})
export default router
