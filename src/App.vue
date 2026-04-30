<template>
  <div>
    <nav>
      <RouterLink to="/">🏠 Acasă</RouterLink>
      <RouterLink to="/products">🛍️ Produse</RouterLink>

      <div class="nav-right">
        <RouterLink v-if="auth.isLoggedIn" to="/cart">
          🛒 Coș ({{ cartStore.totalItems }})
        </RouterLink>
        <RouterLink v-if="auth.isLoggedIn" to="/orders">📦 Comenzi</RouterLink>

        <span v-if="auth.isLoggedIn">
          Salut, {{ auth.user?.name }}!
          <button @click="handleLogout">Logout</button>
        </span>

        <span v-else>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/register">Înregistrare</RouterLink>
        </span>
      </div>
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  color: #1e293b;
}

nav {
  background: #ffffff;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

nav a {
  text-decoration: none;
  color: #475569;
  font-weight: 500;
  font-size: 15px;
  margin-right: 24px;
  transition: color 0.2s;
}

nav a:hover { color: #6366f1; }

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-right button {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

/* BUTTONS */
button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  transition: background 0.2s, transform 0.1s;
}

button:hover { background: #4f46e5; transform: translateY(-1px); }
button:disabled { background: #94a3b8; cursor: not-allowed; transform: none; }

/* INPUTS */
input, select, textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.2s;
  background: white;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #6366f1;
}

/* PRODUCTS GRID */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.product-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.product-card h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1e293b;
}

.product-card .category {
  font-size: 12px;
  color: #6366f1;
  background: #eef2ff;
  padding: 3px 10px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 12px;
  font-weight: 500;
}

.product-card .price {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
}

.product-card .sale {
  color: #ef4444;
  margin-right: 8px;
}

.product-card .crossed {
  text-decoration: line-through;
  color: #94a3b8;
  font-size: 14px;
}

.product-card a {
  display: inline-block;
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
}

.product-card a:hover { text-decoration: underline; }

/* FORMS */
.login, .register {
  max-width: 420px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}

.login h1, .register h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
}

.login form, .register form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login form button, .register form button {
  width: 100%;
  padding: 14px;
  font-size: 16px;
}

.login p, .register p {
  text-align: center;
  margin-top: 16px;
  color: #64748b;
  font-size: 14px;
}

.login p a, .register p a {
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
}

.error {
  background: #fef2f2;
  color: #ef4444;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  border: 1px solid #fecaca;
}

/* CART */
.cart h1 { margin-bottom: 24px; }

.cart-item {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.cart-item h3 { font-size: 16px; font-weight: 600; }
.cart-item p { color: #64748b; font-size: 14px; }

.cart-item button {
  background: #fef2f2;
  color: #ef4444;
  padding: 8px 16px;
  font-size: 13px;
}

.cart-item button:hover { background: #ef4444; color: white; }

.checkout {
  background: white;
  padding: 24px;
  border-radius: 12px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

/* ORDERS */
.order-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.order-header h3 { font-weight: 600; }

.status {
  background: #fef3c7;
  color: #d97706;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #475569;
  border-bottom: 1px solid #f1f5f9;
}

.order-total {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 12px;
  font-size: 14px;
  color: #64748b;
}

.order-total strong {
  font-size: 18px;
  color: #1e293b;
  margin-top: 8px;
}

/* PAGINATION */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
}

/* PRODUCT DETAIL */
.product-detail {
  max-width: 600px;
  margin: 0 auto;
}

.product-detail h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 16px 0 8px;
}

.product-detail .description {
  color: #64748b;
  line-height: 1.7;
  margin: 16px 0;
}

.product-detail .price {
  font-size: 24px;
  font-weight: 700;
  margin: 16px 0;
}

.product-detail .stock {
  color: #64748b;
  margin-bottom: 16px;
}

.product-detail .quantity {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.product-detail .quantity button {
  width: 40px;
  height: 40px;
  padding: 0;
  font-size: 20px;
  border-radius: 8px;
}

.product-detail .quantity span {
  font-size: 20px;
  font-weight: 600;
  min-width: 40px;
  text-align: center;
}

.success {
  background: #f0fdf4;
  color: #16a34a;
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 16px;
  border: 1px solid #bbf7d0;
}

.success a {
  color: #16a34a;
  font-weight: 600;
  margin-left: 8px;
}

/* FILTERS */
.filters {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filters input {
  flex: 1;
  min-width: 150px;
}

h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
h2 { font-size: 22px; font-weight: 600; margin-bottom: 16px; }
</style>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/useAuthStore'
import { useCartStore } from './stores/useCartStore'

const auth      = useAuthStore()
const cartStore = useCartStore()
const router    = useRouter()

async function handleLogout() {
  await auth.logout()
  router.push('/login')
}

onMounted(async () => {
  await auth.fetchUser()
  if (auth.isLoggedIn) {
    cartStore.fetchCart()
  }
})
</script>