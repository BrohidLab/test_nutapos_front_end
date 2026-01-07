import { createRouter, createWebHistory } from 'vue-router'

import Diskon from '../pages/diskon/index.vue'

const routes = [
  {
    path: '/',
    name: 'diskon',
    component: Diskon,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
