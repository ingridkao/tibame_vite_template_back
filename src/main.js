import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { 
    Button, Table, Drawer,
    Input,
    Carousel, CarouselItem
} from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'

import App from './App.vue'
import router from './router'

const vueApp = createApp(App)

vueApp.use(createPinia())
vueApp.use(router)

vueApp.component('Button', Button)
vueApp.component('Table', Table)
vueApp.component('Drawer', Drawer)
vueApp.component('Input', Input)
vueApp.component('Carousel', Carousel)
vueApp.component('CarouselItem', CarouselItem)

vueApp.mount('#app')
