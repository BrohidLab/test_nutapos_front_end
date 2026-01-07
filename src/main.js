import { createApp } from 'vue'
import App from './App.vue'
import router from './route/index.js'
import '@mdi/font/css/materialdesignicons.css'
import { vuetify } from './plugins/vuetify'

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
