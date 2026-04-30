<template>
    <div class="register">
      <h1>Înregistrare</h1>
  
      <div v-if="error" class="error">{{ error }}</div>
  
      <form @submit.prevent="handleRegister">
        <input
          v-model="name"
          type="text"
          placeholder="Nume"
          required
        />
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
        <input
          v-model="passwordConfirmation"
          type="password"
          placeholder="Confirmă parola"
          required
        />
        <button type="submit" :disabled="loading">
          {{ loading ? 'Se încarcă...' : 'Înregistrează-te' }}
        </button>
      </form>
  
      <p>Ai deja cont? <RouterLink to="/login">Login</RouterLink></p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/useAuthStore'
  
  const router              = useRouter()
  const auth                = useAuthStore()
  const name                = ref('')
  const email               = ref('')
  const password            = ref('')
  const passwordConfirmation = ref('')
  const loading             = ref(false)
  const error               = ref('')
  
  async function handleRegister() {
    loading.value = true
    error.value   = ''
    try {
      await auth.register(name.value, email.value, password.value, passwordConfirmation.value)
      router.push('/')
    } catch (e) {
      error.value = 'Eroare la înregistrare. Verifică datele!'
    } finally {
      loading.value = false
    }
  }
  </script>