<script setup lang="ts">
import { ref } from 'vue'
import type { Component } from 'vue'

import CommunityIcon from '@/assets/icons/community.svg'
import LogoIcon from '@/assets/icons/logo-04.svg'
import GiftIcon from '@/assets/icons/gift.svg'
import PhoneIcon from '@/assets/icons/phone.svg'
import SteamIcon from '@/assets/icons/steam-01.svg'
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
const emailError = ref('')
const passwordError = ref('')
const successMessage = ref('')

const a11yMode = ref(false)

const validateEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const handleLogin = () => {
  emailError.value = ''
  passwordError.value = ''
  successMessage.value = ''

  let valid = true

  if (!validateEmail(email.value)) {
    emailError.value = 'Введите корректный email'
    announce('Ошибка: Введите корректный email')
    valid = false
  }

  if (password.value.length < 6) {
    passwordError.value = 'Пароль должен быть не менее 6 символов'
    announce('Ошибка: Пароль должен быть не менее 6 символов')
    valid = false
  }

  if (valid) {
    successMessage.value = 'Успешный вход!'
    announce('Успешный вход')
    console.warn('Отправка данных:', {
      email: email.value,
      password: password.value,
    })
    email.value = ''
    password.value = ''
  }
}

const goToRegister = () => {
  announce('Переход на страницу регистрации')
  console.warn('Переход на страницу регистрации (пока не реализовано)')
}

const toggleA11y = () => {
  a11yMode.value = !a11yMode.value
  const message = a11yMode.value
    ? 'Режим озвучки включен'
    : 'Режим озвучки выключен'
  announce(message)
}

const announce = (text: string) => {
  if (!a11yMode.value || text.trim() === '') {
    return
  }
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'ru-RU'
  utterance.rate = 1
  speechSynthesis.cancel()
  speechSynthesis.speak(utterance)
}
</script>

<template>
  <div id="app">
    <header class="navbar">
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
    </header>

    <div class="auth-wrapper" :style="{ backgroundImage: `url(${BgImage})` }">
      <div class="auth-container">
        <h2>Вход в систему</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                placeholder="Поле ввода Email"
                :class="{ invalid: emailError }"
                @focus="announce('Поле ввода Email')"
              >
              <p v-if="emailError" class="error">{{ emailError }}</p>
            </label>
          </div>

          <div class="form-group">
            <label for="password">
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                placeholder="Поле ввода Пароль"
                :class="{ invalid: passwordError }"
                @focus="announce('Поле ввода Пароль')"
              >
              <p v-if="passwordError" class="error">{{ passwordError }}</p>
            </label>
          </div>

          <button type="submit" @focus="announce('Кнопка Войти')">Войти</button>
          <p v-if="successMessage" class="success">{{ successMessage }}</p>
        </form>

        <button
          type="button"
          class="register-btn"
          @click="goToRegister"
          @focus="announce('Кнопка Регистрация')"
        >
          Регистрация
        </button>
      </div>
    </div>

    <button
      type="button"
      class="a11y-toggle"
      :aria-pressed="a11yMode"
      @click="toggleA11y"
    >
      {{ a11yMode ? 'Озвучка вкл.' : 'Озвучка выкл.' }}
    </button>
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

html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.5rem;
  background: #252525;
  border-bottom: 1px solid #252525;
  height: 50px;
  position: relative;
}

.logo {
  position: absolute;
  left: 1.5rem;
  height: 50px;
  margin-right: 1rem;
  color: #42b983;
}

.menu {
  display: flex;
  gap: 2rem;
  position: absolute;
  height: 72px;
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
  width: 150px;
  height: 50px;
  justify-content: flex-start;
  transition: background 0.3s, color 0.3s;
}

.menu-item:hover {
  background: #369e6f;
  color: #fff;
}

.menu-item:hover .icon {
  transition: filter 0.3s;
  filter: brightness(0) invert(1);
}

.menu-text {
  font-weight: 600;
  font-size: 1rem;
}

.icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: block;
}

.login-btn {
  position: absolute;
  right: 1.5rem;
  background: #42b983;
  color: #252525;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  cursor: pointer;
  width: 150px;
  height: 50px;
  top: -2px;
  font-weight: 600;
  font-size: 1rem;
}

.login-btn:hover {
  background: #369e6f;
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
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

h2 {
  text-align: center;
  height: 50px;
  margin-bottom: 1.5rem;
  color: #42b983;
  font-size: 1.5rem;
  font-weight: 600;
}

.form-group {
  width: 100%;
}

.form-group input {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #000;
  border-radius: 10px;
  box-sizing: border-box;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 550;
}

input {
  width: 100%;
  padding: 0.6rem;
  font-size: 18px;
  font-weight: 550;
  letter-spacing: 1.6px;
  color: #252525;
  border: 1px solid #000000;
  border-radius: 10px;
  transition: border 0.3s, box-shadow 0.3s;
}

input::placeholder {
  color: #888888;
  font-size: 16px;
  font-weight: 550;
  letter-spacing: 1px;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

input.invalid {
  border-color: #e74c3c;
}

.error {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.3rem;
  font-weight: 600;
  font-size: 1rem;
}

.success {
  color: #2ecc71;
  text-align: center;
  margin-top: 1rem;
  font-weight: 600;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  background-color: #42b983;
  color: #252525;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  margin-top: 0.8rem;
  font-weight: 600;
  font-size: 1rem;
}

button:hover {
  background-color: #369e6f;
  transform: scale(1.02);
}

.register-btn {
  background-color: #252525;
  color: #42b983;
  border: 1px solid #42b983;
  font-weight: 600;
  font-size: 1rem;
}

.register-btn:hover {
  background-color: #252525;
}

.a11y-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ffd700;
  color: #000;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  width: auto;
  height: auto;
  margin-top: 0;
}
</style>
