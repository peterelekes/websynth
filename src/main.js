import './assets/main.css'

import { createApp } from 'vue'
import emitter from './mitt';
import App from './App.vue'
import {store} from "@/store/store.js";


const app = createApp(App)
window.emitter = emitter;
app.config.globalProperties.$mitt = emitter;
app.use(store);
app.mount('#app')
