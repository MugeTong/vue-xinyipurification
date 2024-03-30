import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about-us',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/products',
      name: 'products-showcase',
      component: () => import('@/views/ProductsView.vue')
    }, {
      path: '/cases',
      name: 'cases-showcase',
      component: () => import('@/views/CasesView.vue')
    },
    {
      path: '/contact',
      name: 'contact-us',
      component: () => import('@/views/ContactView.vue')
    }, {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/404.vue')
    }
  ]
})

export default router
