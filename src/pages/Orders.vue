<template>
    <div class="orders">
      <h1>📦 Comenzile mele</h1>
  
      <div v-if="loading">Se încarcă... ⏳</div>
  
      <div v-if="orders.length === 0 && !loading">
        <p>Nu ai nicio comandă încă!</p>
        <RouterLink to="/products">← Cumpără ceva</RouterLink>
      </div>
  
      <div
        v-for="order in orders"
        :key="order.id"
        class="order-card"
      >
        <div class="order-header">
          <h3>{{ order.order_number }}</h3>
          <span class="status">{{ order.status }}</span>
        </div>
  
        <div
          v-for="item in order.items"
          :key="item.id"
          class="order-item"
        >
          <span>{{ item.product.name }}</span>
          <span>{{ item.quantity }}x</span>
          <span>{{ item.price }} €</span>
        </div>
  
        <hr>
        <div class="order-total">
          <span>Subtotal: {{ order.subtotal }} €</span>
          <span>Tax: {{ order.tax }} €</span>
          <span>Livrare: {{ order.shipping }} €</span>
          <strong>Total: {{ order.total }} €</strong>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import api from '../api/axios'
  
  const orders  = ref([])
  const loading = ref(false)
  
  onMounted(async () => {
    loading.value = true
    try {
      const response = await api.get('/orders')
      orders.value = response.data
    } finally {
      loading.value = false
    }
  })
  </script>