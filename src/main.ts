import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css' // Material Design Icons
import 'vuetify/styles' // Vuetify styles

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Import Labs Components
import { VCalendar } from 'vuetify/labs/VCalendar'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VTimePicker } from 'vuetify/labs/VTimePicker'

// Import VueDatePicker
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// Import FullCalendar
import FullCalendar from '@fullcalendar/vue3'

// Create Vuetify instance
const vuetify = createVuetify({
  components: {
    ...components,
    VCalendar,
    VDateInput,
    VTimePicker,
    VueDatePicker,
  },
  directives,
})

// Create Vue App
const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
