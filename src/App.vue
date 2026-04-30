<template>
  <div>
    <nav>
      <RouterLink to="/">🏠 Acasă</RouterLink>
      <RouterLink to="/products">🛍️ Produse</RouterLink>

      <div class="nav-right">
        <RouterLink v-if="auth.isLoggedIn" to="/cart">
          🛒 Coș ({{ cartStore.totalItems }})
        </RouterLink>
        <RouterLink v-if="auth.isLoggedIn" to="/orders">📦 Comenzi</RouterLink>

        <span v-if="auth.isLoggedIn">
          Salut, {{ auth.user?.name }}!
          <button @click="handleLogout">Logout</button>
        </span>

        <span v-else>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/register">Înregistrare</RouterLink>
        </span>
      </div>
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/useAuthStore'
import { useCartStore } from './stores/useCartStore'

const auth      = useAuthStore()
const cartStore = useCartStore()
const router    = useRouter()

async function handleLogout() {
  await auth.logout()
  router.push('/login')
}

onMounted(async () => {
  await auth.fetchUser()
  if (auth.isLoggedIn) {
    cartStore.fetchCart()
  }
})
</script>