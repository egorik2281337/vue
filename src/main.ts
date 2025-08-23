import { createApp } from "vue"
import App from "./App.vue"

const app = createApp(App)

// если будут плагины (router, pinia и т.д.), их сюда подключишь:
// app.use(router)
// app.use(store)

app.mount("#app")
