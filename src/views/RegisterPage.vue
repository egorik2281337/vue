<script setup lang="ts">
import { ref } from 'vue'
import type { Component } from 'vue'
import { useRouter } from 'vue-router'

import CommunityIcon from '@/assets/icons/community.svg?component'
import LogoIcon from '@/assets/icons/logo-04.svg?component'
import GiftIcon from '@/assets/icons/gift.svg?component'
import PhoneIcon from '@/assets/icons/phone.svg?component'
import SteamIcon from '@/assets/icons/steam-01.svg?component'
import BgImage from '@/assets/icons/back.png'

interface MenuItem {
  text: string
  icon: Component
}

const menuItems: MenuItem[] = [
  { text: 'Пополняй стим', icon: SteamIcon },
  { text: 'Игровая валюта', icon: PhoneIcon },
  { text: 'Гифты', icon: GiftIcon },
  { text: 'Ключи', icon: CommunityIcon },
]

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const successMessage = ref('')

const router = useRouter()

const validateEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const handleRegister = () => {
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''
  successMessage.value = ''
  let valid = true

  if (!validateEmail(email.value)) {
    emailError.value = 'Введите корректный email'
    valid = false
  }
  if (password.value.length < 6) {
    passwordError.value = 'Пароль должен быть не менее 6 символов'
    valid = false
  }
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Пароли не совпадают'
    valid = false
  }
  if (valid) {
    successMessage.value = 'Регистрация успешна!'
    console.warn('Регистрация:', { email: email.value, password: password.value })
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div id="app">
    <header class="navbar">
      <div class="navbar-desktop">
        <LogoIcon class="logo" />
        <nav class="menu" aria-label="Главное меню">
          <button
            v-for="(item, index) in menuItems"
            :key="index"
            class="menu-item"
          >
            <component :is="item.icon" class="icon" />
            <span class="menu-text">{{ item.text }}</span>
          </button>
        </nav>
        <button class="login-btn" type="button" @click="goToLogin">Вход</button>
      </div>

      <div class="navbar-mobile">
        <LogoIcon class="logo" />
        <button class="login-btn" type="button" @click="goToLogin">Вход</button>
      </div>

      <nav class="menu-mobile" aria-label="Меню мобильной версии">
        <button
          v-for="(item, index) in menuItems"
          :key="index"
          class="menu-item"
        >
          <component :is="item.icon" class="icon" />
          <span class="menu-text">{{ item.text }}</span>
        </button>
      </nav>
    </header>

    <div class="auth-wrapper" :style="{ backgroundImage: `url(${BgImage})` }">
      <div class="auth-container">
        <h2>Регистрация</h2>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Email"
              :class="{ invalid: emailError }"
            >
            <p v-if="emailError" class="error">{{ emailError }}</p>
          </div>

          <div class="form-group">
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Пароль"
              :class="{ invalid: passwordError }"
            >
            <p v-if="passwordError" class="error">{{ passwordError }}</p>
          </div>

          <div class="form-group">
            <input
              id="confirm-password"
              v-model="confirmPassword"
              type="password"
              placeholder="Подтвердите пароль"
              :class="{ invalid: confirmPasswordError }"
            >
            <p v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</p>
          </div>

          <button type="submit">Зарегистрироваться</button>
          <p v-if="successMessage" class="success">{{ successMessage }}</p>
        </form>

        <button
          type="button"
          class="register-btn"
          @click="goToLogin"
        >
          Уже есть аккаунт? Вход
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}

.navbar { width: 100%; background: #252525; border-bottom: 1px solid #252525; }

.navbar-desktop, .navbar-mobile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1.5rem;
}

.navbar-mobile { display: none; }

.logo { height: 40px; color: #42b983; }

.menu {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  background: #42b983;
  color: #252525;
  cursor: pointer;
  min-width: 140px;
  justify-content: center;
  transition: background 0.3s, color 0.3s;
}

.menu-item:hover { background: #369e6f; color: #fff; }

.icon { width: 28px; height: 28px; }

.login-btn {
  background: #42b983;
  color: #252525;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  min-width: 140px;
  max-width: 140px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.login-btn:hover { background: #369e6f; }

.menu-mobile {
  display: none;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  scrollbar-width: none;
}
.menu-mobile::-webkit-scrollbar { display: none; }
.menu-mobile .menu-item {
  min-width: 120px;
  max-width: 140px;
  font-size: 0.85rem;
  height: 45px;
  padding: 0.4rem 0.6rem;
  justify-content: center;
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  padding: 1rem;
  box-sizing: border-box;
}

.auth-container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border: 1px solid #c7b1b1;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(182, 180, 180, 0.1);
  background-color: #ffffff;
}

h2 { text-align: center; margin-bottom: 1.5rem; color: #42b983; font-size: 1.5rem; font-weight: 600; }

.form-group { margin-bottom: 1rem; }

input {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #000;
  border-radius: 10px;
}

input:focus { outline: none; border-color: #42b983; }
input.invalid { border-color: #e74c3c; }

.error { color: #e74c3c; font-size: 0.9rem; margin-top: 0.3rem; font-weight: 600; }
.success { color: #2ecc71; text-align: center; margin-top: 1rem; font-weight: 600; }

button { width: 100%; padding: 0.8rem; font-size: 1rem; background-color: #42b983; color: #252525; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
button:hover { background-color: #369e6f; }

.register-btn {
background-color: #252525;
color: #42b983;
border: 1px solid #42b983;
margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .navbar-desktop { display: none; }
  .navbar-mobile { display: flex; }
  .menu-mobile { display: flex; }

  .logo { height: 36px; }
  .icon { width: 22px; height: 22px; }
}
</style>
