import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/axios'

export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const product  = ref(null)
  const loading  = ref(false)
  const pagination = ref(null)

  async function fetchProducts(params = {}) {
    loading.value = true
    try {
      const response = await api.get('/products', { params })
      products.value = response.data.data
      pagination.value = response.data
    } finally {
      loading.value = false
    }
  }

  async function fetchProduct(id) {
    loading.value = true
    try {
      const response = await api.get(`/products/${id}`)
      product.value = response.data
    } finally {
      loading.value = false
    }
  }

  return { products, product, loading, pagination, fetchProducts, fetchProduct }
})