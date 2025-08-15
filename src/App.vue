<template>
  <div>
    <!-- Верхняя панель -->
    <header class="top-bar">
  <div class="left-side">
    <img src="https://kupikod.com/favicon.ico" alt="KupiKod" class="site-logo" />
  </div>

  <div class="features">
    <div class="feature-item" v-for="item in features" :key="item.text">
      <img :src="item.icon" alt="" class="feature-icon" />
      <span>{{ item.text }}</span>
    </div>
  </div>

  <div class="right-side">
    <button class="login-btn">Вход</button>
  </div>
</header>


    <!-- Основной фон и форма -->
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

      <button class="a11y-toggle" @click="toggleA11y">
        {{ a11yMode ? 'Озвучка вкл.' : 'Озвучка выкл.' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const icon1 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiICBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMS45OCAwQTEyLjAxIDEyLjAxIDAgMCAwIDAgMTEuMDRsNi40NCAyLjY2YTMuMzggMy4zOCAwIDAgMSAyLjEtLjU5bDIuODctNC4xNFY4LjlhNC41MyA0LjUzIDAgMSAxIDQuNTQgNC41MmgtLjFsLTQuMSAyLjkxLjAxLjE2YTMuNCAzLjQgMCAwIDEtNi43NC42N2wtNC42LTEuOUExMi4wMiAxMi4wMiAwIDAgMCAyNCAxMmMwLTYuNjMtNS4zOC0xMi0xMi4wMi0xMlpNNy41MyAxOC4ybC0xLjQ3LS42YTIuNTYgMi41NiAwIDAgMCA0LjY2LTIuMDcgMi41NCAyLjU0IDAgMCAwLTMuMjctMS40MmwxLjUzLjYzYTEuODggMS44OCAwIDEgMS0xLjQ1IDMuNDdabTExLjQ0LTkuM2EzLjAyIDMuMDIgMCAxIDAtNi4wNS4wMiAzLjAyIDMuMDIgMCAwIDAgNi4wNS0uMDFabS01LjI5IDBhMi4yNyAyLjI3IDAgMSAxIDQuNTQgMCAyLjI3IDIuMjcgMCAwIDEtNC41NCAwWiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPgo=";
const icon2 = "data:image/svg+xml,%3Csvg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.8758 0.906123C2.90318 0.879988 2.93181 0.855098 2.96293 0.832697C3.79933 0.290092 4.76394 0.00012207 5.83433 0.00012207C6.83503 0.00012207 7.7735 0.277647 8.57256 0.758027C8.63106 0.791628 8.79038 0.901145 8.87128 0.999461C8.09835 0.148218 5.82811 1.9764 5.82811 1.9764C5.04398 1.37032 4.32084 0.958392 3.7844 0.810296C3.33383 0.68709 3.02391 0.790384 2.8758 0.906123ZM9.74502 1.71007C9.73379 1.69697 9.72163 1.6845 9.7093 1.67187L9.70929 1.67185C9.69703 1.65929 9.68462 1.64656 9.67283 1.63291C9.47867 1.41886 9.23845 1.36783 9.02188 1.38028C8.82398 1.44375 7.91414 1.77106 6.79271 2.83013C6.79271 2.83013 7.25274 3.2774 7.78769 3.90822C8.61625 3.53878 9.53406 3.33341 10.4998 3.33341C10.5941 3.33341 10.6879 3.33537 10.7812 3.33925C10.5365 2.73288 10.1833 2.18168 9.74502 1.71007ZM6.29361 4.24389C6.4044 4.35362 6.51453 4.46407 6.62397 4.57524C4.9343 5.7846 3.83317 7.76375 3.83317 10.0001C3.83317 10.0944 3.83513 10.1882 3.839 10.2815C1.88085 9.49193 0.499765 7.57464 0.499765 5.33408C0.497276 3.97881 1.01381 2.67332 1.94107 1.68892C1.94107 1.68892 2.16884 1.42633 2.52605 1.40019C2.8758 1.42135 3.24173 1.57567 3.57529 1.77479C3.58525 1.78101 3.59396 1.78723 3.59396 1.78723L3.59894 1.78848C4.29221 2.20912 4.84608 2.81644 4.84608 2.81644C4.24118 3.39389 2.79117 5.16358 2.31197 6.34462C1.57763 8.14915 1.91244 8.9307 1.91244 8.9307C1.99583 7.94381 3.50062 6.18532 4.02586 5.62529C4.32084 5.30919 4.85231 4.77032 5.2618 4.3559V4.35714C5.58043 4.03357 5.82687 3.78716 5.82687 3.78716C5.99116 3.94521 6.14674 4.09828 6.29361 4.24389ZM4.49984 10.0001C4.49984 6.68637 7.18613 4.00008 10.4998 4.00008C13.8135 4.00008 16.4998 6.68637 16.4998 10.0001C16.4998 13.3138 13.8135 16.0001 10.4998 16.0001C7.18613 16.0001 4.49984 13.3138 4.49984 10.0001ZM6.18207 11.2387C5.84476 11.4484 5.9572 11.8468 6.67678 12.0355C7.41885 12.2662 8.22837 12.3291 9.01541 12.2033C9.04176 12.2033 9.0681 12.1961 9.08993 12.1901C9.10536 12.1859 9.11853 12.1823 9.12785 12.1823V11.4694L8.36329 11.7C8.07097 11.7839 7.77864 11.8049 7.48631 11.742C7.26144 11.6791 7.30641 11.5533 7.57625 11.4484L9.12785 10.9452V10.1694L6.96911 10.8613C6.69927 10.9452 6.42942 11.071 6.18207 11.2387ZM11.399 8.09359V10.1275C12.321 10.5468 13.0406 10.1275 13.0406 9.03714C13.0406 7.92585 12.6133 7.42262 11.3765 7.02423C10.7244 6.81456 10.0498 6.62585 9.3752 6.50004V12.5597L10.9493 13V7.90488C10.9493 7.67423 10.9493 7.50649 11.1292 7.5694C11.3765 7.6323 11.399 7.86294 11.399 8.09359ZM14.3223 10.7565C13.6702 10.5468 12.9731 10.4629 12.2985 10.5258C11.9387 10.5468 11.6014 10.6307 11.2866 10.7355L11.2191 10.7565V11.5742L12.6808 11.071C12.9731 10.9871 13.2654 10.9662 13.5578 11.0291C13.7826 11.092 13.7377 11.2178 13.4678 11.3226L11.2191 12.0984V12.8952L14.3223 11.8258C14.5472 11.742 14.7496 11.6371 14.9295 11.4694C15.0869 11.2597 15.0194 10.9662 14.3223 10.7565Z' fill='white'/%3E%3C/svg%3E%0A";
const icon3 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04LjU4IDBoNy41YzEgMCAxLjk1LjM4IDIuNjUgMS4wNS43LjY4IDEuMSAxLjYgMS4xIDIuNTV2MTYuOGMwIC45NS0uNCAxLjg3LTEuMSAyLjU1QTMuODMgMy44MyAwIDAgMSAxNi4wOCAyNGgtNy41Yy0xIDAtMS45NS0uMzgtMi42NS0xLjA1LS43LS42OC0xLjEtMS42LTEuMS0yLjU1VjMuNmMwLS45NS40LTEuODcgMS4xLTIuNTVBMy44MyAzLjgzIDAgMCAxIDguNTggMFpNNy4zMyAyLjkyaDEwYy4zNSAwIC42My4yNy42My42djEyLjNjMCAuMzMtLjI4LjYtLjYzLjZoLTEwYS42MS42MSAwIDAgMS0uNjItLjZWMy41MmMwLS4zMy4yOC0uNi42Mi0uNlptNSAxOGMxLjA0IDAgMS44OC0uOCAxLjg4LTEuOHMtLjg0LTEuOC0xLjg4LTEuOGMtMS4wMyAwLTEuODcuOC0xLjg3IDEuOHMuODQgMS44IDEuODcgMS44WiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPgo=";
const icon4 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE5IDE1djIuOGMwIDEuMTEtLjEyIDEuNTEtLjMzIDEuOTItLjIyLjQtLjU0LjczLS45NS45NS0uNC4yMS0uODEuMzMtMS45Mi4zM0gxM3YtNmg2Wm0tOCAwdjZIOC4yYy0xLjExIDAtMS41MS0uMTItMS45Mi0uMzMtLjQtLjIyLS43My0uNTQtLjk1LS45NS0uMi0uMzgtLjMxLS43Ni0uMzMtMS43MVYxNWg2Wm03LjY4LTdjLjYgMCAuOTcuMSAxLjMuMjcuMzIuMTcuNTguNDMuNzUuNzUuMTguMzMuMjcuNy4yNyAxLjN2MS40YzAgLjQ0LS4wNS42LS4xMy43N2EuOS45IDAgMCAxLS4zOC4zOGMtLjE2LjA4LS4zMy4xMy0uNzcuMTNIMTNWOGg1LjY4Wk0xMSA4djVINC4yOGMtLjQ0IDAtLjYtLjA1LS43Ny0uMTNhLjkuOSAwIDAgMS0uMzgtLjM4IDEuMjQgMS4yNCAwIDAgMS0uMTMtLjYyVjEwLjMyYzAtLjYuMS0uOTcuMjctMS4zLjE3LS4zMi40My0uNTguNzUtLjc1LjI5LS4xNi42LS4yNSAxLjA4LS4yN0gxMVptNi4zLTUuM2MxLjU3IDEuNTcuMjUgNS4yNy01IDUuM0gxMmMtNS41LjEtNi45LTMuNy01LjMtNS4zIDEuNTYtMS41NiA1LjIyLS4yNiA1LjMgNC45MS4wOC01LjE3IDMuNzQtNi40NyA1LjMtNC45MVoiIGZpbGw9IiNmZmYiLz48L3N2Zz4K";
const icon5 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOS4yNyAxLjUxYy40Mi40Mi40MiAxLjEgMCAxLjUxbC0xLjAyIDEuMDMgMi40NCAyLjQ0QTEuMDcgMS4wNyAwIDAgMSAxOS4yIDhsLTIuNDUtMi40NUwxNS40IDYuOWwyLjQ1IDIuNDVhMS4wNyAxLjA3IDAgMSAxLTEuNTEgMS41TDEzLjg5IDguNGwtMS43MiAxLjczYTYuMDQgNi4wNCAwIDEgMS0xLjc3LTEuMjVsMi43NC0yLjc0IDQuNjItNC42M2MuNDItLjQxIDEuMS0uNDEgMS41MSAwWk03Ljg1IDEwLjQ1YTMuOTEgMy45MSAwIDEgMCAwIDcuODIgMy45MSAzLjkxIDAgMCAwIDAtNy44MloiIGZpbGw9IiNmZmYiLz48L3N2Zz4K";

const features = [
  { text: "Пополняй стим", icon: icon1 },
  { text: "Консоли", icon: icon2 },
  { text: "Игровая валюта", icon: icon3 },
  { text: "Гифты", icon: icon4 },
  { text: "Ключи", icon: icon5 }
];

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

body {
  font-family: 'Inter', sans-serif;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  padding: 0.5rem 1rem;
  color: #fff;
  margin-top: -15px;
}

.left-side {
  display: flex;
  align-items: center;
}

.site-logo {
  width: 40px;
  height: 40px;
  margin-left: 20px;
  margin-top: 20px;
}

.features {
  display: flex;
  justify-content: center;
  flex: 1; /* чтобы центрировать блок */
  gap: 0.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 15px;
}

.feature-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.feature-icon {
  width: 20px;
  height: 20px;
}

.right-side {
  display: flex;
  align-items: center;
}

.login-btn {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  margin-top: 15px; 
}


.login-btn:hover {
  background-color: #369e6f;
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px); 
  width: 100vw;
  background-image: url('https://id.kupikod.com/_nuxt/bg.DcNXRhN0.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

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

/* Кнопка озвучки */
.a11y-toggle {
  position: fixed;
  bottom: 20px;   /* отступ снизу */
  right: 20px;    /* справа */
  background-color: #ffd700;
  color: #000;
  padding: 0.4rem 0.8rem; /* компактнее */
  font-size: 0.85rem;     /* уменьшаем текст */
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
