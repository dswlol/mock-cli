// https://unocss.dev/ 原子 css 库
import '@unocss/reset/tailwind-compat.css' // unocss reset
import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import JsonEditorVue from 'json-editor-vue'
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'

// 你自定义的 css
import './styles/main.css'

import App from './App.vue'

const app = createApp(App)

app.use(JsonEditorVue)
app.use(VueMonacoEditorPlugin)
app.mount('#app')
