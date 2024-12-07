import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

//primevue
import PrimeVue from 'primevue/config'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})
app.use(vuetify)
app.use(PrimeVue)

app.use(createPinia())
app.use(router)

app.mount('#app')
