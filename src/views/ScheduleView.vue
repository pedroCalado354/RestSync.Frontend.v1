<template>
    <div class="d-flex">
      <!-- Employee List on the Left -->
      <v-sheet class="pa-4" width="300" elevation="2">
        <v-list>
          <v-list-item v-for="employee in employees" :key="employee.id">
            <v-list-item-content>
              <v-list-item-title>{{ employee.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
  
      <!-- Calendar/Grid on the Right -->
      <v-sheet class="flex-grow-1 pa-4">
        <v-calendar
          v-model="selectedDate"
          :events="formattedEvents"
          event-color="primary"
          event-text-color="white"
          :attributes="calendarAttributes"
          :show-week-numbers="false"
        >
          <template v-slot:event="event">
            <v-card
              :key="event.item.id"
              class="pa-2 mb-4"
              outlined
              style="width: 150px; height: 80px; background-color: #f3f3f3; border-radius: 8px; display: flex; flex-direction: column; justify-content: center; text-align: center;"
            >
              <v-card-title class="text-h6" style="font-size: 12px; margin-bottom: 0;">
                {{ formatScheduleTime(new Date(event.item.start), new Date(event.item.end)) }}
              </v-card-title>
            </v-card>
          </template>
        </v-calendar>
      </v-sheet>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        employees: [
          { id: 1, name: "Alice Johnson" },
          { id: 2, name: "Bob Smith" },
          { id: 3, name: "Carol Williams" },
          { id: 4, name: "David Brown" },
          { id: 5, name: "Eva Davis" },
          { id: 6, name: "Frank Harris" },
          { id: 7, name: "Grace Moore" },
          { id: 8, name: "Henry Taylor" },
          { id: 9, name: "Ivy Lee" },
          { id: 10, name: "Jack White" },
        ],
        dates: ["25th Dec", "26th Dec", "27th Dec", "28th Dec", "29th Dec"], // Sample dates
        events: [
          {
            id: 1,
            title: "Morning Shift",
            start: new Date(2024, 11, 25, 9, 0),
            end: new Date(2024, 11, 25, 17, 0),
            employeeId: 1,
            day: "25th Dec",
          },
          {
            id: 2,
            title: "Afternoon Shift",
            start: new Date(2024, 11, 25, 13, 0),
            end: new Date(2024, 11, 25, 21, 0),
            employeeId: 2,
            day: "25th Dec",
          },
          {
            id: 3,
            title: "Night Shift",
            start: new Date(2024, 11, 26, 22, 0),
            end: new Date(2024, 11, 26, 6, 0),
            employeeId: 3,
            day: "26th Dec",
          },
          {
            id: 4,
            title: "Morning Shift",
            start: new Date(2024, 11, 27, 8, 0),
            end: new Date(2024, 11, 27, 16, 0),
            employeeId: 4,
            day: "27th Dec",
          },
          {
            id: 5,
            title: "Afternoon Shift",
            start: new Date(2024, 11, 28, 12, 0),
            end: new Date(2024, 11, 28, 20, 0),
            employeeId: 5,
            day: "28th Dec",
          },
          {
            id: 6,
            title: "Evening Shift",
            start: new Date(2024, 11, 29, 17, 0),
            end: new Date(2024, 11, 29, 23, 0),
            employeeId: 6,
            day: "29th Dec",
          },
        ],
        selectedDate: null,
      };
    },
    computed: {
      // Format the events to match v-calendar expected format
      formattedEvents() {
        return this.events.map(event => ({
          id: event.id,
          name: event.title,
          start: event.start,
          end: event.end,
          color: '#1976D2',
          textColor: 'white',
        }));
      },
      // Add specific attributes to events
      calendarAttributes() {
        return [
          {
            key: 'highlighted',
            value: (date) => this.dates.includes(date.toLocaleDateString('en-US')),
          },
        ];
      },
    },
    methods: {
      formatScheduleTime(start, end) {
        const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${startTime} - ${endTime}`;
      },
    },
  };
  </script>
  
  <style scoped>
  .v-card {
    max-width: 150px;
    height: 80px;  /* Smaller size for the card */
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  
  .schedule-time {
    font-size: 12px;
    color: #555;
  }
  
  .employee-name {
    font-size: 12px;
    color: #888;
    margin-top: 10px;
  }
  
  .v-row {
    margin-bottom: 20px;
  }
  </style>
  