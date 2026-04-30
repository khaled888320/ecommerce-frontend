import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../api/axios'

export const useCartStore = defineStore('cart', () => {
  const items   = ref([])
  const loading = ref(false)

  const total      = computed(() => items.value.reduce((sum, item) => sum + (item.product.price * item.quantity), 0))
  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  async function fetchCart() {
    loading.value = true
    try {
      const response = await api.get('/cart')
      items.value = response.data.items
    } finally {
      loading.value = false
    }
  }

  async function addToCart(productId, quantity = 1) {
    await api.post('/cart', { product_id: productId, quantity })
    await fetchCart()
  }

  async function removeFromCart(cartItemId) {
    await api.delete(`/cart/${cartItemId}`)
    await fetchCart()
  }

  async function checkout(paymentMethod, notes = '') {
    const response = await api.post('/orders', {
      payment_method: paymentMethod,
      notes
    })
    items.value = []
    return response.data
  }

  return { items, loading, total, totalItems, fetchCart, addToCart, removeFromCart, checkout }
})