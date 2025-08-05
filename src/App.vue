<template>
   <div class="image-box"> <!-- картинка -->
    <img
      src="https://homdgcat.wiki/homdgcat-res/Avatar/UI_AvatarIcon_Chasca.png"
      alt="Пример изображения"
      class="external-image"
    />
  </div>
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
          />
          <p v-if="passwordError" class="error">{{ passwordError }}</p>
        </div>

        <button type="submit">Войти</button>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </form>

      <!-- Новая кнопка регистрации -->
      <button class="register-btn" @click="goToRegister">Регистрация</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const successMessage = ref('')

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
    valid = false
  }

  if (password.value.length < 6) {
    passwordError.value = 'Пароль должен быть не менее 6 символов'
    valid = false
  }

  if (valid) {
    successMessage.value = 'Успешный вход!'
    console.log('Отправка данных:', {
      email: email.value,
      password: password.value
    })

    email.value = ''
    password.value = ''
  }
}

// Пока просто вывод в консоль
function goToRegister() {
  console.log('Переход на страницу регистрации (пока не реализовано)')
}
</script>

<style scoped>
.auth-container { /* основной бокс */
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border: 1px solid #c7b1b1;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(182, 180, 180, 0.1);
  font-family: sans-serif;
  background-color: #ffffff;
}

h2 { /* Заголовок (Вход в систему) */
  text-align: center;
  margin-bottom: 1.5rem;
  color: #42b983;
}

.form-group { /* Подпись Email и пароль */
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

.register-btn { /* Кнопка регистрации */
  background-color: #ffffff;
  color: #42b983;
  border: 1px solid #42b983;
  margin-top: 1rem;
}

.register-btn:hover {
  background-color: #f0fef9;
}

.external-image {
  width: 300px;
  border-radius: 12px;
  display: block;
  margin: 0 auto;
}

</style>
