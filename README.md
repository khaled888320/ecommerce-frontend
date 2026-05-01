# 🛍️ E-Commerce Frontend — Vue 3

A modern e-commerce frontend built with Vue 3, Pinia and Vue Router.

## 🚀 Tech Stack

- **Vue 3** — Composition API
- **Pinia** — State Management
- **Vue Router** — Navigation
- **Axios** — HTTP Client
- **Vite** — Build Tool

## ✨ Features

- 🔐 Authentication (Register, Login, Logout)
- 🏠 Home page with featured products
- 🛍️ Products listing with search & filters
- 📄 Product detail page
- 🛒 Shopping cart
- ✅ Checkout flow
- 📦 Orders history
- 🔒 Protected routes (Navigation Guards)
- 📱 Responsive design

## 🏗️ Architecture

src/
├── api/
│   └── axios.js          # Axios instance + interceptors
├── stores/
│   ├── useAuthStore.js   # Authentication state
│   ├── useCartStore.js   # Cart state
│   └── useProductStore.js # Products state
├── pages/
│   ├── Home.vue
│   ├── Products.vue
│   ├── ProductDetail.vue
│   ├── Cart.vue
│   ├── Orders.vue
│   ├── Login.vue
│   └── Register.vue
├── router/
│   └── index.js          # Routes + Navigation Guards
└── App.vue               # Root component + Navbar

## ⚙️ Installation

```bash
git clone https://github.com/khaled888320/ecommerce-frontend.git
cd ecommerce-frontend
npm install
npm run dev
```

> ⚠️ Make sure the Laravel API is running on http://127.0.0.1:8000

## 🔗 Related

- **Backend API**: [ecommerce-vue-laravel](https://github.com/khaled888320/ecommerce-vue-laravel)

## 👨‍💻 Author

**Khaled Marouani** — Full Stack Developer
- GitHub: [@khaled888320](https://github.com/khaled888320)

## 🌐 Live Demo

- **Frontend**: https://ecommerce-frontend-peach-eta.vercel.app
- **Backend API**: https://ecommerce-api-r1wr.onrender.com