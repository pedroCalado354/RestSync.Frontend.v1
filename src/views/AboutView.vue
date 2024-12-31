<template>
  <div class="calendar-container is-light-mode">
    <Qalendar
      :events="events"
      :config="config"
      @event-was-clicked="handleEventClick"
      @updated-mode="handleModeUpdate"
      @edit-event="handleEditEvent"
      @delete-event="handleDeleteEvent"
      @date-was-clicked="handleDateClick"
    >
      <!-- Custom layout for events in week and day views -->
      <template #weekDayEvent="eventProps">
        <div class="custom-event-card">
          <div class="event-time">{{ formatTime(eventProps.eventData.time) }}</div>
          <div class="event-title">{{ eventProps.eventData.title }}</div>
          <div class="event-person">{{ eventProps.eventData.person }}</div>
        </div>
      </template>

      <!-- Custom layout for events in month view -->
      <template #monthEvent="monthEventProps">
        <div class="custom-event-card">
          <div class="event-time">{{ formatTime(monthEventProps.eventData.time) }}</div>
          <div class="event-title">{{ monthEventProps.eventData.title }}</div>
          <div class="event-person">{{ monthEventProps.eventData.person }}</div>
        </div>
      </template>
    </Qalendar>
  </div>
</template>

<script>
import { Qalendar } from 'qalendar'
import { employees as employeeData } from '@/data/employeesScheduleData.js'

export default {
  components: {
    Qalendar,
  },

  data() {
    return {
      events: employeeData.map((employee) => ({
        title: employee.title,
        with: employee.with,
        time: { start: employee.time.start, end: employee.time.end },
        colorScheme: employee.isDayOff ? 'off' : 'sports',
        isEditable: true,
        id: employee.id,
        description: employee.description,
      })),
      config: {
        week: {
          // Takes the value 'sunday' or 'monday'
          // However, if startsOn is set to 'sunday' and nDays to 5, the week displayed will be Monday - Friday
          startsOn: 'monday',
          // Takes the values 5 or 7.
          nDays: 7,
          // Scroll to a certain hour on mounting a week. Takes any value from 0 to 23.
          // This option is not compatible with the 'dayBoundaries'-option, and will simply be ignored if custom day boundaries are set.
          scrollToHour: 5,
        },
        defaultMode: 'month',
        style: {
          colorSchemes: {
            sports: {
              color: '#fff',
              backgroundColor: 'green',
            },
            off: {
              color: 'black',
              backgroundColor: '#FF0000',
            },
          },
        },
      },
    }
  },
  methods: {
    // Triggered when an event is clicked
    handleEventClick(eventDetails) {
      console.log('Event was clicked:', eventDetails)
      // Implement logic to view details, e.g., open a modal or display details
    },

    // Triggered when the user updates the mode
    handleModeUpdate({ mode, period }) {
      console.log('Mode updated:', mode, 'Period:', period)
      // Implement logic to update the view (e.g., switch between month/week/day views)
    },

    // Triggered when the user clicks the edit icon
    handleEditEvent(eventDetails) {
      console.log('Edit event:', eventDetails)
      // Implement logic to edit the event (e.g., open an event edit form)
    },

    // Triggered when the user clicks the delete icon
    handleDeleteEvent(eventDetails) {
      console.log('Delete event:', eventDetails)
      // Implement logic to confirm and delete the event
    },

    // Triggered when the user clicks on a date in month mode
    handleDateClick(date) {
      console.log('Date was clicked:', date)
      // Implement logic to create an event or view events for the selected date
    },
  },
}
</script>

<style>
@import 'qalendar/dist/style.css';
/* General container styling */
.calendar-container {
  max-width: 80%; /* Limits the width to 80% of the page */
  margin: 20px auto; /* Centers the calendar and adds vertical spacing */
  padding: 20px; /* Adds internal spacing */
  background-color: white; /* Light background color for the container */
  border-radius: 12px; /* Rounded edges for the container */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
}
.calendar-month__weekday {
  position: relative;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.calendar-month__day-date {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 14px;
  font-weight: bold;
  background-color: #fff;
  padding: 2px 5px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
</style>
