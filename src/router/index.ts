import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from 'views/home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('views/quill-editor/index.vue')
  },
  {
    path: '/custom-element',
    name: 'CustomElement',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "CustomElement" */ '@/views/custom-element.vue'
      )
  },
  {
    path: '/spread-sheet',
    name: 'SpreadSheet',
    component: () => import('views/spread-sheet.vue')
  },
  {
    path: '/virtual-data',
    name: 'VirtualData',
    component: () => import('views/virtual-data.vue')
  },
  {
    path: '/quill-editor',
    name: 'QuillEditor',
    component: () => import('views/quill-editor/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
