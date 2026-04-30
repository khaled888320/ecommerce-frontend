<template>
    <div class="product-detail">
      <div v-if="store.loading">Se încarcă... ⏳</div>
  
      <div v-if="store.product">
        <RouterLink to="/products">← Înapoi la produse</RouterLink>
  
        <h1>{{ store.product.name }}</h1>
        <p class="category">{{ store.product.category?.name }}</p>
        <p class="description">{{ store.product.description }}</p>
  
        <div class="price">
          <span v-if="store.product.sale_price" class="sale">
            {{ store.product.sale_price }} €
          </span>
          <span :class="{ crossed: store.product.sale_price }">
            {{ store.product.price }} €
          </span>
        </div>
  
        <p class="stock">Stock disponibil: {{ store.product.stock }}</p>
  
        <div class="quantity">
          <button @click="quantity > 1 ? quantity-- : null">-</button>
          <span>{{ quantity }}</span>
          <button @click="quantity++">+</button>
        </div>
  
        <button
          @click="handleAddToCart"
          :disabled="cartStore.loading || store.product.stock === 0"
        >
          {{ store.product.stock === 0 ? 'Stoc epuizat' : '🛒 Adaugă în coș' }}
        </button>
  
        <div v-if="addedToCart" class="success">
          ✅ Produs adăugat în coș!
          <RouterLink to="/cart">Vezi coșul →</RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useProductStore } from '../stores/useProductStore'
  import { useCartStore } from '../stores/useCartStore'
  import { useAuthStore } from '../stores/useAuthStore'
  import { useRouter } from 'vue-router'
  
  const route      = useRoute()
  const router     = useRouter()
  const store      = useProductStore()
  const cartStore  = useCartStore()
  const authStore  = useAuthStore()
  const quantity   = ref(1)
  const addedToCart = ref(false)
  
  async function handleAddToCart() {
    if (!authStore.isLoggedIn) {
      router.push('/login')
      return
    }
    await cartStore.addToCart(store.product.id, quantity.value)
    addedToCart.value = true
    setTimeout(() => addedToCart.value = false, 3000)
  }
  
  onMounted(() => {
    store.fetchProduct(route.params.id)
  })
  </script>