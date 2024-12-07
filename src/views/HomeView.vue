<script>
import axios from 'axios'

export default {
  data() {
    return {
      employees: [], // Holds the fetched list of employees
      loading: false, // Loading state for API call
      error: null, // Error state for API call
    }
  },
  async created() {
    this.fetchEmployees()
  },
  methods: {
    // Fetches employee data from the API
    async fetchEmployees() {
      this.loading = true // Start loading
      this.error = null // Reset error
      try {
        const response = await axios.get(
          'https://restsyncapi20241207182039.azurewebsites.net//WeatherForecast/GetEmployees',
        )
        this.employees = response.data // Populate employees list
      } catch (err) {
        this.error = 'Failed to load employees. Please try again.' // Set error message
      } finally {
        this.loading = false // Stop loading
      }
    },
  },
}
</script>

<template>
  <v-container>
    <!-- Display loading indicator while fetching data -->
    <v-progress-linear v-if="loading" indeterminate color="blue" />

    <!-- Display error message if data fetch fails -->
    <v-alert v-if="error" type="error" dismissible>
      {{ error }}
    </v-alert>

    <!-- Employees List -->
    <v-card v-if="!loading && employees.length" outlined>
      <v-card-title>Employee List</v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="employee in employees" :key="employee.employeeId">
          <v-list-item-avatar>
            <!-- Placeholder avatar -->
            <v-avatar color="blue lighten-2" size="40">
              <span class="white--text">{{ employee.firstName[0] }}</span>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ employee.firstName }}</v-list-item-title>
            <v-list-item-subtitle>{{ employee.lastName }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- Empty state if no employees are found -->
    <v-alert v-if="!loading && !employees.length && !error" type="info">
      No employees found.
    </v-alert>
  </v-container>
</template>

<style scoped>
/* Add any additional styling if needed */
.v-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
