import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/about.vue')
  },
  {
    path: '/spread-sheet',
    name: 'SpreadSheet',
    component: () => import('../views/spread-sheet.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
