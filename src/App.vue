<template>
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
            :class="{ 'invalid': emailError }"
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
            :class="{ 'invalid': passwordError }"
            @focus="announce('Поле ввода Пароль')"
          />
          <p v-if="passwordError" class="error">{{ passwordError }}</p>
        </div>

        <button type="submit" @focus="announce('Кнопка Войти')">Войти</button>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </form>

      <button class="register-btn" @click="goToRegister" @focus="announce('Кнопка Регистрация')">
        Регистрация
      </button>
    </div>
  </div>

  <!-- Кнопка озвучки вынесена за пределы auth-wrapper -->
  <button class="a11y-toggle" @click="toggleA11y">
    {{ a11yMode ? 'Озвучка вкл.' : 'Озвучка выкл.' }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const successMessage = ref('')
const a11yMode = ref(false) 

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

function handleLogin() {
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
    console.log('Отправка данных:', {
      email: email.value,
      password: password.value
    })

    email.value = ''
    password.value = ''
  }
}

function goToRegister() {
  announce('Переход на страницу регистрации')
  console.log('Переход на страницу регистрации (пока не реализовано)')
}
function toggleA11y() {
  a11yMode.value = !a11yMode.value
  announce(a11yMode.value ? 'Режим озвучки включен' : 'Режим озвучки выключен')
}
function announce(text) {
  if (!a11yMode.value) return
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'ru-RU'
  utterance.rate = 1
  speechSynthesis.cancel() 
  speechSynthesis.speak(utterance)
}
</script>

<style scoped>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  width: 100vw;
  background-image: url('https://id.kupikod.com/_nuxt/bg.DcNXRhN0.webp');
  background-size: cover;       
  background-position: center;  
  background-repeat: no-repeat; 
}

/* форма регистр */
.auth-container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border: 1px solid #c7b1b1;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(182, 180, 180, 0.1);
  font-family: sans-serif;
  background-color: #ffffff;
}

h2 { /* заголовок */
  text-align: center;
  margin-bottom: 1.5rem;
  color: #42b983;
}

.form-group { /* заголовок емайл и пароль */
  margin-bottom: 1.2rem;
  color: #42b983;
}

label { 
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 550;
}

input { /* обводка полей */
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #42b983;
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
  margin-top: 1rem;
}

.register-btn:hover {
  background-color: #f0fef9;
}

/* озвучка */
.a11y-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #42b983;
  color: #000;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

</style>
