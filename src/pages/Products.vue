<template>
    <div class="products">
      <h1>🛍️ Produse</h1>
  
      <!-- Filtre -->
      <div class="filters">
        <input
          v-model="search"
          placeholder="Caută produs..."
          @input="handleSearch"
        />
        <input
          v-model="minPrice"
          type="number"
          placeholder="Preț minim"
          @input="handleSearch"
        />
        <input
          v-model="maxPrice"
          type="number"
          placeholder="Preț maxim"
          @input="handleSearch"
        />
      </div>
  
      <div v-if="store.loading">Se încarcă... ⏳</div>
  
      <div class="products-grid">
        <div
          v-for="product in store.products"
          :key="product.id"
          class="product-card"
        >
          <h3>{{ product.name }}</h3>
          <p class="category">{{ product.category?.name }}</p>
          <p class="price">
            <span v-if="product.sale_price" class="sale">{{ product.sale_price }} €</span>
            <span :class="{ crossed: product.sale_price }">{{ product.price }} €</span>
          </p>
          <p class="stock">Stock: {{ product.stock }}</p>
          <RouterLink :to="`/products/${product.id}`">Vezi detalii →</RouterLink>
        </div>
      </div>
  
      <!-- Paginare -->
      <div class="pagination" v-if="store.pagination">
        <button
          @click="changePage(store.pagination.current_page - 1)"
          :disabled="store.pagination.current_page === 1"
        >← Înapoi</button>
        <span>Pagina {{ store.pagination.current_page }} din {{ store.pagination.last_page }}</span>
        <button
          @click="changePage(store.pagination.current_page + 1)"
          :disabled="store.pagination.current_page === store.pagination.last_page"
        >Înainte →</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useProductStore } from '../stores/useProductStore'
  
  const store    = useProductStore()
  const search   = ref('')
  const minPrice = ref('')
  const maxPrice = ref('')
  
  function handleSearch() {
    store.fetchProducts({
      search:    search.value,
      min_price: minPrice.value,
      max_price: maxPrice.value,
    })
  }
  
  function changePage(page) {
    store.fetchProducts({
      page,
      search:    search.value,
      min_price: minPrice.value,
      max_price: maxPrice.value,
    })
  }
  
  onMounted(() => {
    store.fetchProducts()
  })
  </script>