import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/Home.vue') },
  { path: '/products', component: () => import('../pages/Products.vue') },
  { path: '/products/:id', component: () => import('../pages/ProductDetail.vue') },
  { path: '/cart', component: () => import('../pages/Cart.vue'), meta: { requiresAuth: true } },
  { path: '/orders', component: () => import('../pages/Orders.vue'), meta: { requiresAuth: true } },
  { path: '/login', component: () => import('../pages/Login.vue') },
  { path: '/register', component: () => import('../pages/Register.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const { useAuthStore } = await import('../stores/useAuthStore')
    const auth = useAuthStore()
    if (!auth.isLoggedIn) {
      next('/login')
      return
    }
  }
  next()
})

export default router