import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

import 'bootstrap/dist/css/bootstrap.min.css'

const pinia = createPinia()

const app = createApp(App)
pinia.use(({ store }) => {
  store.router = markRaw(router)
})
app.use(pinia)
app.use(router)
app.use(VueCookies)
router.isReady().then(() => {
  app.mount('#app')
})
