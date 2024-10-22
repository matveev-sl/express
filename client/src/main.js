import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Убедись, что это правильный путь

createApp(App)
  .use(router)
  .mount('#app')
