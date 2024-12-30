<template>
  <!-- Dialog component, visibility controlled by v-model -->
  <v-dialog v-model="isVisible" max-width="500px">
    <!-- Button to open the dialog -->
    <template v-slot:activator="{ props }">
      <v-btn class="mb-2" color="primary" dark v-bind="props"> {{ activatorText }} </v-btn>
    </template>
    <v-card>
      <!-- Dialog title, passed as a prop -->
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>

      <!-- Form fields for the employee -->
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="employeeData.name" label="Name"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="employeeData.department" label="Department"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="employeeData.salary"
                label="Salary"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- Dialog actions -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- Cancel button: emits event to close the dialog -->
        <v-btn color="blue-darken-1" variant="text" @click="cancel"> Cancel </v-btn>
        <!-- Save button: emits the save event with employee data -->
        <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EmployeeFormDialog',
  props: {
    // Title of the dialog
    title: {
      type: String,
      default: 'New Employee',
    },
    // Text for the activator button
    activatorText: {
      type: String,
      default: 'Add Employee',
    },
    // Controls dialog visibility via v-model
    modelValue: {
      type: Boolean,
      required: true,
    },
    // Initial data for the employee being edited or created
    employee: {
      type: Object,
      default: () => ({
        name: '',
        department: '',
        salary: 0,
      }),
    },
  },
  emits: [
    // Sync visibility state with parent
    'update:modelValue',
    // Emit the save event with employee data
    'save',
  ],
  data() {
    return {
      // Local copy of employee data for editing
      employeeData: { ...this.employee },
    }
  },
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
    // Cancel action: resets data and hides the dialog
    cancel() {
      this.isVisible = false
      this.employeeData = { ...this.employee }
    },
    // Save action: emits the updated employee data and hides the dialog
    save() {
      this.$emit('save', this.employeeData)
      this.isVisible = false
    },
  },
  watch: {
    // Sync local employeeData with the parent-provided employee object
    employee: {
      handler(newEmployee) {
        this.employeeData = { ...newEmployee }
      },
      immediate: true,
    },
  },
}
</script>
