<script setup lang="ts">
import { ref } from 'vue'
import CommunityIcon from '@/assets/icons/community.svg'
import LogotipIcon from '@/assets/icons/logotip.svg'

const menuItems = [
  { text: 'Пополняй стим', icon: CommunityIcon },
  { text: 'Консоли', icon: CommunityIcon },
  { text: 'Игровая валюта', icon: CommunityIcon },
  { text: 'Гифты', icon: CommunityIcon },
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
      <LogotipIcon class="logo" />

      <nav class="menu" aria-label="Главное меню">
        <button
          v-for="(item, index) in menuItems"
          :key="index"
          class="menu-item"
        >
          <component :is="item.icon" /> {{ item.text }}
        </button>
      </nav>

      <button class="login-btn" type="button">Вход</button>
    </header>

    <div class="auth-wrapper" :style="{ backgroundImage: 'url(/back.svg)' }">
      <div class="auth-container">
        <h2>Вход в систему</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">
              <input id="email" type="text">
              id="email"
              v-model="email"
              name="email"
              type="email"
              :class="{ invalid: emailError }"
              @focus="announce('Поле ввода Email')"
              >
              <p v-if="emailError" class="error">{{ emailError }}</p>
            </label>
          </div>

          <div class="form-group">
            <label for="password">
              <input id="password" type="text">
              id="password"
              v-model="password"
              name="password"
              type="password"
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

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1.5rem;
  background: #252525;
  border-bottom: 1px solid #252525;
}

.logo {
  height: 30px;
  margin-right: 1rem;
}

.menu {
  display: flex;
  gap: 1rem;
  flex-grow: 1;
  justify-content: center;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background: #42b983;
  color: #252525;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s;
}

.menu-item:hover {
  background: #369e6f;
  color: #fff;
}

.login-btn {
  background: #42b983;
  color: #252525;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  cursor: pointer;
}

.login-btn:hover {
  background: #369e6f;
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
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
  margin-bottom: 1.5rem;
  color: #42b983;
}

.form-group {
  margin-bottom: 1.2rem;
  color: #42b983;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 550;
}

input {
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #000000;
  border-radius: 10px;
  transition: border 0.3s, box-shadow 0.3s;
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
}

.success {
  color: #2ecc71;
  text-align: center;
  margin-top: 1rem;
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
}

button:hover {
  background-color: #369e6f;
  transform: scale(1.02);
}

.register-btn {
  background-color: #252525;
  color: #42b983;
  border: 1px solid #42b983;
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
}
</style>
