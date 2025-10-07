<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Component } from 'vue'

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

const router = useRouter()

const menuItems: MenuItem[] = [
  { text: 'Пополняй стим', icon: SteamIcon },
  { text: 'Игровая валюта', icon: PhoneIcon },
  { text: 'Гифты', icon: GiftIcon },
  { text: 'Ключи', icon: CommunityIcon },
]

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const successMessage = ref('')

const validateEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const handleLogin = () => {
  emailError.value = ''
  passwordError.value = ''
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
  if (valid) {
    successMessage.value = 'Успешный вход!'
    console.warn('Отправка данных:', { email: email.value, password: password.value })
    email.value = ''
    password.value = ''
  }
}

const goToRegister = () => {
  router.push('/register')
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
        <button class="login-btn" type="button">Вход</button>
      </div>

      <div class="navbar-mobile">
        <LogoIcon class="logo" />
        <button class="login-btn" type="button">Вход</button>
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
        <h2>Вход в систему</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              placeholder="Поле ввода Email"
              :class="{ invalid: emailError }"
            >
            <p v-if="emailError" class="error">{{ emailError }}</p>
          </div>

          <div class="form-group">
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              placeholder="Поле ввода Пароль"
              :class="{ invalid: passwordError }"
            >
            <p v-if="passwordError" class="error">{{ passwordError }}</p>
          </div>

          <button type="submit">Войти</button>
          <p v-if="successMessage" class="success">{{ successMessage }}</p>
        </form>

        <button
          type="button"
          class="register-btn"
          @click="goToRegister"
        >
          Регистрация
        </button>
      </div>
    </div>
  </div>
</template>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}

.navbar {
  width: 100%;
  background: #252525;
  border-bottom: 1px solid #252525;
}

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
  max-width: 420px;
  padding: 2rem 2.5rem;
  border: 1px solid #c7b1b1;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(182, 180, 180, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #42b983;
  font-size: 1.6rem;
  font-weight: 600;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  width: 100%;
  max-width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #000;
  border-radius: 10px;
  box-sizing: border-box;
  height: 45px;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

input.invalid {
  border-color: #e74c3c;
}

button {
  width: 100%;
  height: 45px;
  padding: 0.8rem;
  font-size: 1rem;
  background-color: #42b983;
  color: #252525;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #369e6f;
}

.register-btn {
  background-color: #252525;
  color: #42b983;
  border: 1px solid #42b983;
  margin-top: 0.8rem;
}

.error {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.3rem;
  font-weight: 600;
  text-align: left;
  width: 100%;
}

.success {
  color: #2ecc71;
  text-align: center;
  margin-top: 1rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .navbar-desktop { display: none; }
  .navbar-mobile { display: flex; }
  .menu-mobile { display: flex; }
  .logo { height: 36px; }
  .icon { width: 22px; height: 22px; }
}
</style>
