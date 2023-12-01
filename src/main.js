import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/style.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFileExport)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(Toast)
app.mount('#app')
