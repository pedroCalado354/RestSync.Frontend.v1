<script>
export default {
  computed: {
    // Determines whether to show the sidebar menu
    // Sidebar is hidden on the Login page ('/Login')
    showNavbar() {
      return this.$route.path !== '/Login'
    },
  },
  methods: {
    // Redirects the user to the login page when they log out
    logout() {
      this.$router.push('/')
    },
  },
}
</script>

<template>
  <!-- The root component provided by Vuetify -->
  <v-app>
    <!-- Sidebar navigation menu -->
    <!-- Conditionally display sidebar -->
    <!-- Background color of the sidebar -->
    <!-- Ensures proper styling for dark mode -->
    <v-navigation-drawer app v-if="showNavbar" color="blue darken-4" dark>
      <!-- List of navigation items -->
      <v-list>
        <!-- Home Link -->
        <v-list-item link :to="{ path: '/home' }">
          <v-list-item-icon>
            <!-- Icon for the Home link -->
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- About Link -->
        <v-list-item link :to="{ path: '/about' }">
          <v-list-item-icon>
            <!-- Icon for the About link -->
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Logout Link -->
        <v-list-item @click.prevent="logout">
          <!-- Prevent default link behavior -->
          <v-list-item-icon>
            <!-- Icon for the Logout link -->
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main content area where pages are rendered -->
    <v-main>
      <router-view />
      <!-- Dynamically loads the routed component -->
    </v-main>
  </v-app>
</template>

<style scoped>
/* Ensures the application fills the entire height of the viewport */
body,
#app,
.v-application {
  margin: 0; /* Remove default margin */
  height: 100vh; /* Full viewport height */
}

/* Optional: Add styling to refine the appearance if necessary */
</style>
