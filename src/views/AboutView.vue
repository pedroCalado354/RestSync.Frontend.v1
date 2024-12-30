<template>
  <div class="calendar-container">
    <v-sheet class="d-flex align-center justify-space-between toolbar" tile>
      <v-select
        v-model="type"
        :items="types"
        class="ma-2"
        label="View Mode"
        variant="outlined"
        dense
        hide-details
      ></v-select>
      <v-select
        v-model="weekday"
        :items="weekdays"
        class="ma-2"
        label="Weekdays"
        variant="outlined"
        dense
        hide-details
      ></v-select>
    </v-sheet>
    <v-sheet class="calendar-sheet">
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        :view-mode="type"
        :weekdays="weekday"
        :event-color="getEventColor"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import { useDate } from 'vuetify'
import { employees as employeeData } from '@/data/employeesScheduleData.js'

export default {
  data: () => ({
    type: 'month',
    types: ['month', 'week', 'day'],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
      { title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
      { title: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
      { title: 'Mon, Wed, Fri', value: [1, 3, 5] },
    ],
    value: [new Date()],
    events: [],
    colors: {
      work: 'green',
      off: 'red',
    },
  }),
  mounted() {
    const adapter = useDate()
    this.getEvents({
      start: adapter.startOfDay(adapter.startOfMonth(new Date())),
      end: adapter.endOfDay(adapter.endOfMonth(new Date())),
    })
  },
  methods: {
    getEvents({ start, end }) {
      const events = []

      employeeData.forEach((employee) => {
        const eventColor =
          employee.startDate && employee.endDate ? this.colors.work : this.colors.off
        const title =
          employee.startDate && employee.endDate
            ? `${employee.name}: ${employee.startDate.split('T')[1]} - ${employee.endDate.split('T')[1]}`
            : `${employee.name}: Off`

        events.push({
          title,
          start: new Date(employee.startDate || employee.date),
          end: new Date(employee.endDate || employee.date),
          color: eventColor,
          allDay: false,
        })
      })

      this.events = events
    },
    getEventColor(event) {
      return event.color
    },
  },
}
</script>

<style scoped>
.calendar-container {
  max-width: 90%;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.toolbar {
  background-color: #fafafa;
  border-bottom: 1px solid #ddd;
}

.calendar-sheet {
  margin: 10px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.v-calendar {
  height: auto;
  min-height: 400px;
  border-radius: 8px;
}
</style>
