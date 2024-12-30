import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css' // Material Design Icons
import 'vuetify/styles' // Vuetify styles

//primevue
import PrimeVue from 'primevue/config'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Import Labs Components
import { VCalendar } from 'vuetify/labs/VCalendar'

// Create Vuetify instance
const vuetify = createVuetify({
  components: {
    ...components,
    VCalendar, // Register VCalendar
  },
  directives,
})

// Create Vue App
const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
