import './assets/main.css'

import { createApp } from 'vue'
import emitter from './mitt';
import App from './App.vue'

const app = createApp(App)
window.emitter = emitter;
app.config.globalProperties.$mitt = emitter;

app.mount('#app')
