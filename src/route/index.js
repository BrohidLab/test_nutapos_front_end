import { createRouter, createWebHistory } from 'vue-router'

import Diskon from '../pages/diskon/index.vue'
import Testing from '../pages/diskon/testing.vue'

const routes = [
  {
    path: '/',
    name: 'diskon',
    component: Diskon,
  },
  {
    path: '/testing',
    name: 'test',
    component: Testing,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
