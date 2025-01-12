/* Point d'entrée de l'application */

import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* Création et montage de l'application */
const app = createApp(App)
app.use(router)
app.mount('#app')
