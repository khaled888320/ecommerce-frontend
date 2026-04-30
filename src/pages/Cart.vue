<template>
    <div class="cart">
      <h1>🛒 Coșul meu</h1>
  
      <div v-if="cartStore.loading">Se încarcă... ⏳</div>
  
      <div v-if="cartStore.items.length === 0 && !cartStore.loading">
        <p>Coșul este gol!</p>
        <RouterLink to="/products">← Continuă cumpărăturile</RouterLink>
      </div>
  
      <div v-if="cartStore.items.length > 0">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="cart-item"
        >
          <h3>{{ item.product.name }}</h3>
          <p>Preț: {{ item.product.price }} €</p>
          <p>Cantitate: {{ item.quantity }}</p>
          <p>Total: {{ (item.product.price * item.quantity).toFixed(2) }} €</p>
          <button @click="cartStore.removeFromCart(item.id)">🗑️ Șterge</button>
        </div>
  
        <hr>
  
        <h2>Total: {{ cartStore.total.toFixed(2) }} €</h2>
  
        <div class="checkout">
          <select v-model="paymentMethod">
            <option value="card">Card bancar</option>
            <option value="cash">Cash la livrare</option>
          </select>
          <textarea v-model="notes" placeholder="Note pentru comandă..."></textarea>
          <button @click="handleCheckout" :disabled="loading">
            {{ loading ? 'Se procesează...' : '✅ Plasează comanda' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCartStore } from '../stores/useCartStore'
  
  const cartStore     = useCartStore()
  const router        = useRouter()
  const paymentMethod = ref('card')
  const notes         = ref('')
  const loading       = ref(false)
  
  async function handleCheckout() {
    loading.value = true
    try {
      await cartStore.checkout(paymentMethod.value, notes.value)
      router.push('/orders')
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    cartStore.fetchCart()
  })
  </script>