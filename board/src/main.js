import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  // create naive ui
  create,
  // component
    NButton,NSpace,NMessageProvider,NDropdown
} from 'naive-ui'
// native UI 字體
import 'vfonts/Lato.css'

const naive = create({
  components: [NButton, NSpace, NMessageProvider, NDropdown]
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)
app.mount('#app')
