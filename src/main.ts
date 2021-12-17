import { createApp } from 'vue'
import * as echarts from 'echarts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { key, store } from '@/store'
import App from './App.vue'
import router from '@/router/index'
import styleImport from '@/utils/style-import'
import '@/style/basic.styl'
import svgIcon from './components/SvgIcon.vue'

const app = createApp(App)
styleImport(app)
app.use(router)
app.use(store, key)
app.use(ElementPlus)
app.component('svg-icon', svgIcon)
app.config.globalProperties.$echarts = echarts

app.mount('#app')
