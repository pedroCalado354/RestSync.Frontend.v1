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
    <v-navigation-drawer app v-if="showNavbar" class="custom-drawer" dark>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/lego/8.jpg"
          subtitle="Gerente2"
          title="Lisandra Miguel"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list>
        <!-- Home Link -->
        <v-list-item link :to="{ path: '/home' }">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- About Link -->
        <v-list-item link :to="{ path: '/about' }">
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Emploeyee Link -->
        <v-list-item link :to="{ path: '/employee' }">
          <v-list-item-icon>
            <v-icon>mdi-calendar-check</v-icon>
            <!-- Changed to calendar icon -->
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>employee</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Logout Link -->
        <v-list-item @click.prevent="logout">
          <v-list-item-icon>
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
.custom-drawer {
  background-color: #53667b !important; /* Update background color */
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

.v-list-item {
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.v-list-item:hover {
  background-color: #415a67; /* Darker hover effect */
}

.v-list-item-icon {
  color: #f0f0f0; /* Lighter icon color */
}

.v-list-item-title {
  font-weight: bold;
  color: #f0f0f0;
  font-size: 16px;
  padding-left: 10px; /* Extra padding for title */
}

.v-list-item-content {
  padding-left: 15px; /* Adjusting space between icon and title */
}
</style>
