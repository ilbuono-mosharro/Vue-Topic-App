import {createApp} from 'vue'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "./routers/index.js";

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')
