<template>
    <div class="login">
      <h1>Login</h1>
  
      <div v-if="error" class="error">{{ error }}</div>
  
      <form @submit.prevent="handleLogin">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Parolă"
          required
        />
        <button type="submit" :disabled="loading">
          {{ loading ? 'Se încarcă...' : 'Login' }}
        </button>
      </form>
  
      <p>Nu ai cont? <RouterLink to="/register">Înregistrează-te</RouterLink></p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/useAuthStore'
  
  const router   = useRouter()
  const auth     = useAuthStore()
  const email    = ref('')
  const password = ref('')
  const loading  = ref(false)
  const error    = ref('')
  
  async function handleLogin() {
    loading.value = true
    error.value   = ''
    try {
      await auth.login(email.value, password.value)
      router.push('/')
    } catch (e) {
      error.value = 'Email sau parolă greșită!'
    } finally {
      loading.value = false
    }
  }
  </script>