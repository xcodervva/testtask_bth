import { createApp } from 'vue';
import { createPinia } from "pinia";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import './style.css';
import App from './App.vue';
import { router } from "./router/index";
import { useAuthStore } from "./stores/auth";

createApp(App).use(createPinia()).use(router).use(ElementPlus).mount('#app');

const auth = useAuthStore();

if (auth.token) {
    auth.checkTokenExpiration();
}