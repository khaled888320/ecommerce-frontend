<template>
    <div class="home">
      <h1>🛍️ Bine ai venit!</h1>
  
      <section>
        <h2>Produse Featured</h2>
        <div v-if="store.loading">Se încarcă... ⏳</div>
        <div class="products-grid">
          <div
            v-for="product in store.products"
            :key="product.id"
            class="product-card"
          >
            <h3>{{ product.name }}</h3>
            <p class="category">{{ product.category?.name }}</p>
            <p class="price">{{ product.price }} €</p>
            <RouterLink :to="`/products/${product.id}`">
              Vezi detalii →
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useProductStore } from '../stores/useProductStore'
  
  const store = useProductStore()
  
  onMounted(() => {
    store.fetchProducts({ featured: true })
  })
  </script>