import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import 'normalize.css/normalize.css' // 统一浏览器默认样式，放第一个
import { ApiPlugin } from '@/api/index' // api接口
import './style/index.scss' // 全局样式
import { createPinia } from 'pinia'
const pinia = createPinia()
import i18n from './i18n/index'

createApp(App).use(pinia).use(router).use(ApiPlugin).use(i18n).mount('#app')
