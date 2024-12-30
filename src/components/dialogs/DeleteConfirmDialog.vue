<template>
  <!-- The dialog itself, visibility controlled by v-model binding to isVisible -->
  <v-dialog v-model="isVisible" max-width="500px">
    <v-card>
      <!-- The title of the dialog, passed as a prop -->
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>

      <!-- Actions for the dialog: Cancel and Confirm -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- Cancel button: emits an event to close the dialog -->
        <v-btn color="blue-darken-1" variant="text" @click="cancel"> Cancel </v-btn>
        <!-- Confirm button: emits the confirm event to the parent -->
        <v-btn color="blue-darken-1" variant="text" @click="confirm"> OK </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteDialog',
  props: {
    // Title of the dialog, defaulting to a generic message
    title: {
      type: String,
      default: 'Are you sure?',
    },
    // Controls dialog visibility via v-model
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: [
    // Emit update:modelValue to sync visibility with parent
    'update:modelValue',
    // Emit confirm to signal confirmation action
    'confirm',
  ],
  computed: {
    isVisible: {
      // Getter for dialog visibility (linked to parent via modelValue)
      get() {
        return this.modelValue
      },
      // Setter to notify parent of visibility changes
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  methods: {
    // Cancel action: hides the dialog
    cancel() {
      this.isVisible = false
    },
    // Confirm action: emits confirmation event and hides the dialog
    confirm() {
      this.$emit('confirm')
      this.isVisible = false
    },
  },
}
</script>
