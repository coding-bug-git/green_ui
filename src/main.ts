import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { key, store } from '@/store'

import '@/assets/styles/index.scss'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import elementIcons from '@/components/SvgIcon/elementicons'

import './permission'

const app = createApp(App)

app.component('svg-icon', SvgIcon)

app
  .use(router)
  .use(store, key)
  .use(elementIcons)
  .mount('#app')
