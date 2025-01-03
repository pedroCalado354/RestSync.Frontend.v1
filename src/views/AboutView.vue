<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { ScheduleXCalendar } from '@schedule-x/vue'
import { employees as employeeData } from '@/data/employeesScheduleData.js'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-shadcn/dist/index.css'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import DeleteDialog from '@/components/dialogs/DeleteConfirmDialog.vue'

const dialogShiftTitle = computed(() => (createShiftModel.id ? 'Edit Shift' : 'Add New Shift'))
const isCreateMode = computed(() => (createShiftModel.id ? false : true))
const loading = false // Manage loading state

// Format today's date as 'yyyy-MM-dd'
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
const createShiftDateModal = ref(false)
const eventsServicePlugin = createEventsServicePlugin()

const selectedDays = ref([])
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const select = ref({ state: 'Em Serviço', abbr: 'FL' })
const items = [
  { state: 'Em Serviço', abbr: 'FL' },
  { state: 'Folga', abbr: 'GA' },
]

function getAllEvents() {
  try {
    const events = employeeData.map((employee) => ({
      id: employee.id,
      start: employee.start,
      end: employee.end,
      title: employee.title,
      description: employee.description,
      location: 'employee.location',
      calendarId: employee.isDayOff ? 'off' : 'work',
    }))

    eventsServicePlugin.set(events)
  } catch (error) {
    console.error('Error fetching events:', error)
  }
}

// Factory function to create a default shift model
function createDefaultShiftModel() {
  return {
    id: 0,
    start: null,
    end: null,
    title: '',
    date: new Date(),
    description: '',
    location: '',
  }
}

// Reactive "createShiftModel" object
const createShiftModel = reactive(createDefaultShiftModel())

// Optional: Reset function to reinitialize the form values
function resetShiftModel() {
  Object.assign(createShiftModel, createDefaultShiftModel())
}

function addShift() {
  console.log('createShiftModel', createShiftModel)
  console.log('createShiftModel.date.value', createShiftModel.date.value)
  console.log('createShiftModel.date.value', createShiftModel.date)
  createShiftDateModal.value = false

  if (createShiftModel.date.length > 1) {
    // Add multiple events for each selected day
    createShiftModel.date.forEach((day, index) => {
      const formattedDate = day.toISOString().split('T')[0]

      //check if the date selected is in selectedDays
      let monday = day.getDay() === 1 ? 'Monday' : ''

      if (selectedDays.value.includes(monday)) {
        calendarApp.eventsService.add({
          title: `${createShiftModel.title} Off Day`,
          start: `${formattedDate} 00:00`,
          end: `${formattedDate} 01:00`,
          id: 2,
          description: createShiftModel.description,
        })
      } else {
        calendarApp.eventsService.add({
          title: createShiftModel.title,
          start: `${formattedDate} ${createShiftModel.start}`,
          end: `${formattedDate} ${createShiftModel.end}`,
          id: 2,
          description: createShiftModel.description,
        })
      }
    })
  } else {
    const formattedDate = createShiftModel.date.toISOString().split('T')[0]

    calendarApp.eventsService.add({
      title: createShiftModel.title,
      start: `${formattedDate} ${createShiftModel.start}`,
      end: `${formattedDate} ${createShiftModel.end}`,
      id: 2,
      description: createShiftModel.description,
    })
  }
  close()
}

function formatTime(field) {
  console.log('field', field)
  if (field === 'startTime') {
    let newVal = createShiftModel.start.replace(/[^0-9]/g, '') // Allow only numbers
    if (newVal.length > 2) {
      newVal = newVal.slice(0, 2) + ':' + newVal.slice(2, 4) // Add ':' after 2 digits
    }
    createShiftModel.start = newVal.slice(0, 5) // Limit to HH:MM format
  }
  if (field === 'endTime') {
    let newVal = createShiftModel.end.replace(/[^0-9]/g, '') // Allow only numbers
    if (newVal.length > 2) {
      newVal = newVal.slice(0, 2) + ':' + newVal.slice(2, 4) // Add ':' after 2 digits
    }
    createShiftModel.end = newVal.slice(0, 5) // Limit to HH:MM format
  }
}

function validateTime(value) {
  // Ensure time is valid
  if (!value) return true

  const startDate = convertTimeToDate(createShiftModel.start)
  const endDate = convertTimeToDate(createShiftModel.end)

  if (startDate && endDate && endDate < startDate)
    return 'Invalid time format, start date must be before end date'

  const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/ // Matches 24-hour format (00:00 to 23:59)

  return timePattern.test(value) || 'Invalid time format'
}

function convertTimeToDate(timeString) {
  if (!timeString) return null // Handle empty or undefined inputs

  const [hours, minutes] = timeString.split(':').map(Number) // Split into hours and minutes
  const now = new Date() // Use the current date
  now.setHours(hours, minutes, 0, 0) // Set hours, minutes, seconds, and milliseconds
  return now
}

function deleteShift() {
  eventsServicePlugin.remove(createShiftModel.id)

  createShiftDateModal.value = false
  resetShiftModel()
}

function editShift() {
  const formattedDate = createShiftModel.date.toISOString().split('T')[0]

  calendarApp.eventsService.update({
    title: createShiftModel.title,
    start: `${formattedDate} ${createShiftModel.start}`,
    end: `${formattedDate} ${createShiftModel.end}`,
    id: createShiftModel.id,
    description: createShiftModel.description,
  })

  createShiftDateModal.value = false
  resetShiftModel()
}

function close() {
  createShiftDateModal.value = false
  resetShiftModel()
}

function weekDaysOnChange() {
  console.log('selectedDays', selectedDays)
}

function mapToShiftModel(data) {
  return {
    title: data.title || '',
    start: data.start ? data.start.split(' ')[1] : null,
    end: data.end ? data.end.split(' ')[1] : null,
    date: data.start ? new Date(data.start.split(' ')[0]) : new Date(),
    description: data.description || '',
    location: data.location || '',
    id: data.id || 0,
  }
}
// Do not use a ref here, as the calendar instance is not reactive, and doing so might cause issues
// For updating events, use the events service plugin
const calendarApp = createCalendar({
  theme: 'shadcn',
  selectedDate: formatDate(new Date()), // Apply the formatted date
  views: [createViewMonthGrid(), createViewWeek()],
  defaultView: createViewMonthAgenda(),
  dayBoundaries: {
    start: '06:00',
    end: '23:00',
  },
  calendars: {
    off: {
      colorName: 'off',
      lightColors: {
        main: 'red',
        container: '#ffd2dc',
        onContainer: '#59000d',
      },
    },
    work: {
      colorName: 'work',
      lightColors: {
        main: 'green',
        container: '#aaaeb7',
        onContainer: '#1976d2',
      },
    },
  },
  events: employeeData.map((employee) => ({
    id: employee.id,
    start: employee.start,
    end: employee.end,
    title: employee.title,
    description: employee.description,
    location: 'employee.location',
    calendarId: employee.isDayOff ? 'off' : 'work',
  })),
  plugins: [createDragAndDropPlugin(), eventsServicePlugin],

  callbacks: {
    /**
     * Is called when:
     * 1. Selecting a date in the date picker
     * 2. Selecting a new view
     * */
    onRangeUpdate(range) {
      console.log('new calendar range start date', range.start)
      console.log('new calendar range end date', range.end)
    },

    /**
     * Is called when an event is updated through drag and drop
     * */
    onEventUpdate(updatedEvent) {
      console.log('onEventUpdate', updatedEvent)
    },

    /**
     * Is called before an event is updated by drag & drop or resizing.
     * If you return false, the update will be aborted,
     * and the event will be reset to its original position.
     * If you return true, the event will be updated.
     * */
    onBeforeEventUpdate(oldEvent, newEvent, $app) {
      // run your validation or side effects
      return false
    },

    /**
     * Is called when an event is clicked
     * */
    onEventClick(calendarEvent) {
      const newShiftData = eventsServicePlugin.get(calendarEvent.id)
      createShiftDateModal.value = true
      console.log('test', newShiftData)

      Object.assign(createShiftModel, mapToShiftModel(calendarEvent))
    },

    /**
     * Is called when an event is double clicked
     * */
    onDoubleClickEvent(calendarEvent) {
      console.log('onDoubleClickEvent', calendarEvent)
    },

    /**
     * Is called when clicking a date in the month grid
     * */
    onClickDate(date) {
      console.log('onClickDate', date) // e.g. 2024-01-01
    },

    /**
     * Is called when clicking somewhere in the time grid of a week or day view
     * */
    onClickDateTime(dateTime) {
      console.log('onClickDateTime', dateTime) // e.g. 2024-01-01 12:37
    },

    /**
     * Is called when selecting a day in the month agenda
     * */
    onClickAgendaDate(date) {
      console.log('onClickAgendaDate', date) // e.g. 2024-01-01
    },

    /**
     * Is called when double clicking a day in the month agenda
     * */
    onDoubleClickAgendaDate(date) {
      console.log('onDoubleClickAgendaDate', date) // e.g. 2024-01-01
    },

    /**
     * Is called when double clicking a date in the month grid
     * */
    onDoubleClickDate(date) {
      console.log('onClickDate', date) // e.g. 2024-01-01
    },

    /**
     * Is called when double clicking somewhere in the time grid of a week or day view
     * */
    onDoubleClickDateTime(dateTime) {
      console.log('onDoubleClickDateTime', dateTime) // e.g. 2024-01-01 12:37
    },

    /**
     * Is called when clicking the "+ N events" button of a month grid-day
     * */
    onClickPlusEvents(date) {
      console.log('onClickPlusEvents', date) // e.g. 2024-01-01
    },

    /**
     * Is called when the selected date is updated
     * */
    onSelectedDateUpdate(date) {
      console.log('onSelectedDateUpdate', date)
    },

    /**
     * Runs after the calendar is rendered
     * */
    onRender($app) {
      console.log('onRender', $app)
    },
  },
})
</script>

<template>
  <div>
    <!-- Loading Progress Bar -->
    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
      class="mb-2"
    ></v-progress-linear>

    <header class="header">
      <h1 class="title">Employee Schedule Calendar</h1>
      <p class="subtitle">Easily view and manage employee shifts for the month.</p>
    </header>
    <!-- Divider between header and calendar -->
    <v-btn @click="getAllEvents">Add Shift</v-btn>

    <v-divider></v-divider>

    <div class="pa-4 text-center">
      <v-dialog v-model="createShiftDateModal" max-width="800">
        <!-- Activator Button -->
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" text color="primary"> ADD NEW SHIFT </v-btn> </template
        ><v-card class="dialog-card">
          <!-- Close Button with Icon (Right-Aligned) -->
          <v-btn icon class="close-button ml-auto" @click="close">
            <v-icon color="grey-darken-2">mdi-close</v-icon>
          </v-btn>

          <!-- Title Section -->
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h5">{{ dialogShiftTitle }}</span>
          </v-card-title>

          <!-- Form Section -->
          <form>
            <v-row>
              <!-- Employee Name Field -->
              <v-col cols="12" md="6">
                <v-select
                  v-model="createShiftModel.title"
                  :items="['Lisandra', 'Pedro']"
                  label="Employee Name"
                  append-inner-icon="mdi-account"
                  variant="solo-filled"
                ></v-select>
              </v-col>

              <!-- Description Field -->
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="createShiftModel.description"
                  label="Description"
                  append-inner-icon="mdi-information-outline"
                  variant="solo-filled"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <!-- <VueDatePicker v-model="createShiftModel.date" :is-24="true" /> -->
                <v-date-input
                  v-model="createShiftModel.date"
                  label="Select a date"
                  prepend-icon=""
                  prepend-inner-icon="$calendar"
                  variant="solo"
                  multiple="range"
                ></v-date-input>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="select"
                  :hint="`${select.state}, ${select.abbr}`"
                  :items="items"
                  item-title="state"
                  item-value="abbr"
                  label="Select"
                  persistent-hint
                  return-object
                  single-line
                ></v-select>
              </v-col>

              <!-- Time Pickers -->
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="createShiftModel.start"
                  label="Start Time (HH:MM)"
                  placeholder="HH:MM"
                  variant="solo"
                  maxlength="5"
                  :rules="[validateTime]"
                  @input="formatTime('startTime')"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="createShiftModel.end"
                  label="End Time (HH:MM)"
                  placeholder="HH:MM"
                  variant="solo"
                  maxlength="5"
                  :rules="[validateTime]"
                  @input="formatTime('endTime')"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <h4 class="text-subtitle-1">Select Days Off</h4>
                <v-row direction="column" no-gutters>
                  <v-row>
                    <v-col
                      v-for="(day, index) in weekdays"
                      :key="index"
                      cols="4"
                      class="day-checkbox-container"
                    >
                      <v-checkbox
                        color="primary"
                        @update:modelValue="weekDaysOnChange"
                        v-model="selectedDays"
                        :label="day"
                        :value="day"
                        class="day-checkbox"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-row>
              </v-col>
            </v-row>

            <!-- Action Buttons -->
            <v-row>
              <!-- insert buttons of Add in case dialogShiftCreate is true, otherwise insert edit and delete -->
              <v-col v-if="!isCreateMode" cols="12" class="dialog-actions d-flex justify-end">
                <v-btn color="red" text @click="deleteShift">
                  <v-icon left>mdi-delete</v-icon>
                  Delete
                </v-btn>
                <v-btn color="green" text @click="editShift">
                  <v-icon left>mdi-check</v-icon>
                  Edit
                </v-btn>
              </v-col>
              <v-col v-else cols="12" class="dialog-actions d-flex justify-end">
                <v-btn color="green" text @click="addShift">
                  <v-icon left>mdi-check</v-icon>
                  Add
                </v-btn>
              </v-col>
            </v-row>
          </form>
        </v-card>
      </v-dialog>
    </div>

    <div class="calendar-container">
      <ScheduleXCalendar :calendar-app="calendarApp" />
    </div>
  </div>
</template>

<style scoped>
/* Page container styling */
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

/* Header styling */
.header {
  text-align: center;
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
  padding-top: 20px;
}

.title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.subtitle {
  font-size: 1rem;
  color: #666;
  margin: 0;
}

/* Calendar container styling */
.calendar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 200px);
}

/* Left container for modal button */
.left-container {
  position: absolute;
  top: 100px;
  left: 20px;
}

/* Calendar styling */
.sx-vue-calendar-wrapper {
  width: 90%;
  max-width: 1600px;
  height: 90%;
  max-height: 90vh;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

/* Style for fixed position dialog */
.v-card {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
}

.dialog-card {
  padding: 20px;
  position: relative;
}

.dialog-title {
  text-align: center;
  font-weight: bold;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.form-section-title {
  font-size: 18px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
  color: #555;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.form-section-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Custom styling for the time picker */
.custom-time-picker {
  transform: scale(0.8); /* Scales the entire component to 50% of its original size */
  transform-origin: center; /* Ensures scaling happens from the center */
}

.custom-time-picker .v-picker {
  max-width: none; /* Allow dynamic scaling without cropping */
}

.custom-time-picker .v-picker__body {
  font-size: 0.75rem; /* Adjust font size for labels */
}

.custom-time-picker .v-input__control {
  height: auto; /* Ensure the input adjusts dynamically */
}
.color-square {
  font-size: 1.5em; /* Adjust the size of the square */
}
</style>
