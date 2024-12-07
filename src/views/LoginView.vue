<template>
  <v-container class="d-flex justify-center align-center" fill-height>
    <v-card class="mx-auto py-6 px-8" max-width="400" elevation="6">
      <v-card-title class="justify-center">
        <h3 class="text-h5 font-weight-bold">Sign In</h3>
      </v-card-title>
      <v-card-text>
        <v-form v-model="form" @submit.prevent="login">
          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            label="Email"
            variant="outlined"
            prepend-icon="mdi-email"
            clearable
            class="mb-4"
          ></v-text-field>

          <v-text-field
            type="password"
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            label="Password"
            variant="outlined"
            prepend-icon="mdi-lock"
            placeholder="Enter your password"
            clearable
            class="mb-4"
          ></v-text-field>

          <v-btn
            :disabled="!form"
            :loading="loading"
            color="primary"
            size="large"
            type="submit"
            class="mb-4"
            block
          >
            Sign In
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn text color="secondary" @click="navigateToRegister">
          Don't have an account? Register
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import Button from 'primevue/button'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$router.push('/home')
    },
  },
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
}
</style>
