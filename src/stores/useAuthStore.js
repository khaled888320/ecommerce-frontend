import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../api/axios'

export const useAuthStore = defineStore('auth', () => {
  const user  = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin    = computed(() => user.value?.is_admin === 1)

  async function register(name, email, password, passwordConfirmation) {
    const response = await api.post('/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation
    })
    token.value = response.data.token
    user.value  = response.data.user
    localStorage.setItem('token', token.value)
  }

  async function login(email, password) {
    const response = await api.post('/login', { email, password })
    token.value = response.data.token
    user.value  = response.data.user
    localStorage.setItem('token', token.value)
  }

  async function logout() {
    await api.post('/logout')
    token.value = null
    user.value  = null
    localStorage.removeItem('token')
  }

  async function fetchUser() {
    if (!token.value) return
    const response = await api.get('/me')
    user.value = response.data
  }

  return { user, token, isLoggedIn, isAdmin, register, login, logout, fetchUser }
})