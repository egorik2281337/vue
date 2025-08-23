<template>
  <div id="app">
    <!-- 🔹 Навбар -->
    <header class="navbar">
      <img class="logo" src="https://kupikod.com/favicon.ico" alt="Logo" />
      <nav class="menu">
        <a class="menu-item">
          <img :src="icon" alt="icon" /> Пополняй стим
        </a>
        <a class="menu-item">
          <img :src="icon" alt="icon" /> Консоли
        </a>
        <a class="menu-item">
          <img :src="icon" alt="icon" /> Игровая валюта
        </a>
        <a class="menu-item">
          <img :src="icon" alt="icon" /> Гифты
        </a>
        <a class="menu-item">
          <img :src="icon" alt="icon" /> Ключи
        </a>
      </nav>
      <button class="login-btn">Вход</button>
    </header>

    <!-- 🔹 Форма авторизации -->
    <div class="auth-wrapper">
      <div class="auth-container">
        <h2>Вход в систему</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              v-model="email"
              id="email"
              :class="{ invalid: emailError }"
              @focus="announce('Поле ввода Email')"
            />
            <p v-if="emailError" class="error">{{ emailError }}</p>
          </div>

          <div class="form-group">
            <label for="password">Пароль</label>
            <input
              type="password"
              v-model="password"
              id="password"
              :class="{ invalid: passwordError }"
              @focus="announce('Поле ввода Пароль')"
            />
            <p v-if="passwordError" class="error">{{ passwordError }}</p>
          </div>

          <button type="submit" @focus="announce('Кнопка Войти')">Войти</button>
          <p v-if="successMessage" class="success">{{ successMessage }}</p>
        </form>

        <button
          class="register-btn"
          @click="goToRegister"
          @focus="announce('Кнопка Регистрация')"
        >
          Регистрация
        </button>
      </div>
    </div>

    <!-- 🔹 Кнопка озвучки -->
    <button class="a11y-toggle" @click="toggleA11y">
      {{ a11yMode ? 'Озвучка вкл.' : 'Озвучка выкл.' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const email = ref<string>("")
const password = ref<string>("")
const emailError = ref<string>("")
const passwordError = ref<string>("")
const successMessage = ref<string>("")
const a11yMode = ref<boolean>(false)

// иконка в base64
const icon =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOS4yNyAxLjUxYy40Mi40Mi40MiAxLjEgMCAxLjUxbC0xLjAyIDEuMDMgMi40NCAyLjQ0QTEuMDcgMS4wNyAwIDAgMSAxOS4yIDhsLTIuNDUtMi40NUwxNS40IDYuOWwyLjQ1IDIuNDVhMS4wNyAxLjA3IDAgMSAxLTEuNTEgMS41TDEzLjg5IDguNGwtMS43MiAxLjczYTYuMDQgNi4wNCAwIDEgMS0xLjc3LTEuMjVsMi43NC0yLjc0IDQuNjItNC42M2MuNDItLjQxIDEuMS0uNDEgMS41MSAwWk03Ljg1IDEwLjQ1YTMuOTEgMy45MSAwIDEgMCAwIDcuODIgMy45MSAzLjkxIDAgMCAwIDAtNy44MloiIGZpbGw9IiNmZmYiLz48L3N2Zz4K"

function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

function handleLogin() {
  emailError.value = ""
  passwordError.value = ""
  successMessage.value = ""

  let valid = true

  if (!validateEmail(email.value)) {
    emailError.value = "Введите корректный email"
    announce("Ошибка: Введите корректный email")
    valid = false
  }

  if (password.value.length < 6) {
    passwordError.value = "Пароль должен быть не менее 6 символов"
    announce("Ошибка: Пароль должен быть не менее 6 символов")
    valid = false
  }

  if (valid) {
    successMessage.value = "Успешный вход!"
    announce("Успешный вход")
    console.log("Отправка данных:", {
      email: email.value,
      password: password.value,
    })

    email.value = ""
    password.value = ""
  }
}

function goToRegister() {
  announce("Переход на страницу регистрации")
  console.log("Переход на страницу регистрации (пока не реализовано)")
}

function toggleA11y() {
  a11yMode.value = !a11yMode.value
  announce(a11yMode.value ? "Режим озвучки включен" : "Режим озвучки выключен")
}

function announce(text: string) {
  if (!a11yMode.value) return
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = "ru-RU"
  utterance.rate = 1
  speechSynthesis.cancel()
  speechSynthesis.speak(utterance)
}
</script>

<style scoped>
/* 🔹 Навбар */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1.5rem;
  background: #ffffffcc;
  border-bottom: 1px solid #ddd;
}

.logo {
  height: 40px;
  margin-right: 1rem;
}

.menu {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-grow: 1;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background: #42b983;
  color: white;
  cursor: pointer;
  text-decoration: none;
}

.menu-item:hover {
  background: #369e6f;
}

.login-btn {
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  cursor: pointer;
  margin-left: 1rem;
}

.login-btn:hover {
  background: #369e6f;
}

/* 🔹 Авторизация */
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
  background-image: url("https://id.kupikod.com/_nuxt/bg.DcNXRhN0.webp");
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
  transition: border 0.3s;
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
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 0.8rem;
}

button:hover {
  background-color: #369e6f;
}

.register-btn {
  background-color: #ffffff;
  color: #42b983;
  border: 1px solid #42b983;
}

.register-btn:hover {
  background-color: #f0fef9;
}

/* 🔹 Кнопка озвучки */
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
