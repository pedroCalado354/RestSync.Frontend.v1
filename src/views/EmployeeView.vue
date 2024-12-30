<template>
  <v-text-field
    v-model="search"
    label="Search"
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    hide-details
    single-line
  ></v-text-field>

  <v-data-table
    :headers="headers"
    :items="employees"
    :sort-by="[{ key: 'name', order: 'asc' }]"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Employee Management</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <!-- New Employee Button -->
        <v-btn color="primary" @click="addNewEmployee">
          <v-icon class="me-2">mdi-plus</v-icon>
          New Employee
        </v-btn>

        <v-dialog v-model="dialog" max-width="1000px">
          <v-card class="dialog-card">
            <!-- Close Button -->
            <v-btn icon class="close-button" @click="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>

            <v-card-title class="dialog-title">
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <form>
              <v-row>
                <!-- Personal Details Section -->
                <v-col cols="12">
                  <h3 class="form-section-title">Personal Details</h3>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedEmployee.name"
                    label="Name"
                    append-inner-icon="mdi-account"
                    :error-messages="v$.name.$errors.map((e) => e.$message)"
                    required
                    @blur="v$.name.$touch"
                    @input="v$.name.$touch"
                    variant="solo-filled"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-select
                    v-model="editedEmployee.nationality"
                    :items="['Português', 'Brazilian', 'Indiano']"
                    label="Nationality"
                    append-inner-icon="mdi-earth"
                    variant="solo-filled"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="editedEmployee.nif"
                    :counter="9"
                    label="NIF"
                    type="number"
                    append-inner-icon="mdi-card-account-details"
                    :error-messages="v$.nif.$errors.map((e) => e.$message)"
                    required
                    @blur="v$.nif.$touch"
                    @input="v$.nif.$touch"
                    variant="solo-filled"
                  ></v-text-field>
                </v-col>

                <!-- Contact Information Section -->
                <v-col cols="12">
                  <h3 class="form-section-title">Contact Information</h3>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedEmployee.email"
                    label="Email"
                    append-inner-icon="mdi-email"
                    :error-messages="v$.email.$errors.map((e) => e.$message)"
                    required
                    @blur="v$.email.$touch"
                    @input="v$.email.$touch"
                    variant="solo-filled"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedEmployee.password"
                    label="Password"
                    append-inner-icon="mdi-email"
                    :counter="8"
                    :error-messages="v$.password.$errors.map((e) => e.$message)"
                    type="password"
                    required
                    @blur="v$.password.$touch"
                    @input="v$.password.$touch"
                    variant="solo-filled"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedEmployee.mobile"
                    label="Mobile"
                    type="number"
                    append-inner-icon="mdi-phone"
                    variant="solo-filled"
                  ></v-text-field>
                </v-col>

                <!-- Employment Details Section -->
                <v-col cols="12">
                  <h3 class="form-section-title">Employment Details</h3>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="editedEmployee.employmentType"
                    :items="['Full-Time', 'Part-Time', 'Contract']"
                    label="Employment Type"
                    append-inner-icon="mdi-briefcase"
                    variant="solo-filled"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="editedEmployee.employmentStatus"
                    :items="['Active', 'On Leave', 'Terminated']"
                    label="Employment Status"
                    append-inner-icon="mdi-check-circle"
                    variant="solo-filled"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedEmployee.department"
                    label="Department"
                    append-inner-icon="mdi-office-building"
                    :error-messages="v$.department.$errors.map((e) => e.$message)"
                    required
                    @blur="v$.department.$touch"
                    @input="v$.department.$touch"
                    variant="solo-filled"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedEmployee.restaurant"
                    label="Restaurant"
                    append-inner-icon="mdi-office-building"
                    :error-messages="v$.restaurant.$errors.map((e) => e.$message)"
                    required
                    @blur="v$.restaurant.$touch"
                    @input="v$.restaurant.$touch"
                    variant="solo-filled"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedEmployee.salary"
                    label="Salary"
                    type="number"
                    append-inner-icon="mdi-cash"
                    variant="solo-filled"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedEmployee.supervisor"
                    label="Supervisor/Manager Name"
                    append-inner-icon="mdi-account-tie"
                    variant="solo-filled"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" class="dialog-actions">
                  <v-btn color="grey darken-3" text @click="handleSubmit">Submit</v-btn>
                  <v-btn color="grey darken-3" text @click="resetForm">Reset</v-btn>
                </v-col>
              </v-row>
            </form>
          </v-card>
        </v-dialog>

        <DeleteDialog
          v-model="dialogDelete"
          title="Are you sure you want to delete this employee?"
          @confirm="deleteEmployeeConfirm"
        />
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editEmployee(item)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="deleteEmployee(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { employees as employeeData } from '@/data/employeesData.js'
import DeleteDialog from '@/components/dialogs/DeleteConfirmDialog.vue'
import { useVuelidate } from '@vuelidate/core'
import { maxLength, minLength, required, email, sameAs } from '@vuelidate/validators'

// Reactive state
const dialog = ref(false)
const search = ref('')
const dialogDelete = ref(false)
const editedIndex = ref(-1)
const employees = ref([])
const isNewEmployee = computed(() => editedIndex.value === -1)

// Create a reactive "editedEmployee form" object to store the values of the form fields
const editedEmployee = reactive({
  id: '',
  name: '',
  restaurant: '',
  department: '',
  email: '',
  mobile: '',
  nif: '',
  employmentType: '',
  supervisor: '',
  status: '',
  employmentStatus: '',
  hireDate: '',
  salary: '',
})

const defaultEmployee = {
  id: '',
  name: '',
  restaurant: '',
  department: '',
  email: '',
  mobile: '',
  nif: '',
  employmentType: '',
  supervisor: '',
  status: '',
  employmentStatus: '',
  hireDate: '',
  salary: '',
}

// Table headers
const headers = ref([
  { title: 'Name', align: 'start', key: 'name', sortable: true },
  { title: 'Restaurante', key: 'restaurant', sortable: true },
  { title: 'Função', key: 'department', sortable: true },
  { title: 'WorkingStatus', key: 'status', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false },
])

// Computed property for form title
const formTitle = computed(() => (isNewEmployee.value ? 'New Employee' : 'Edit Employee'))

// Methods
function initialize() {
  employees.value = employeeData
}

function editEmployee(item) {
  editedIndex.value = employees.value.indexOf(item)
  Object.assign(editedEmployee, item)
  dialog.value = true
}

function deleteEmployee(item) {
  editedIndex.value = employees.value.indexOf(item)
  Object.assign(editedEmployee, item)
  dialogDelete.value = true
}
function addNewEmployee() {
  resetForm() // Reset the form fields to default values
  dialog.value = true // Open the dialog
}

function close() {
  dialog.value = false
  resetForm()
}

function closeDelete() {
  dialogDelete.value = false
  resetForm()
}

function deleteEmployeeConfirm() {
  employees.value.splice(editedIndex.value, 1)
  closeDelete()
}

// Form validation

// Define validation rules for each form field using "computed"
const rules = computed(() => {
  return {
    name: { required },
    email: {
      required,
      email, // Must be a valid email address
    },
    password: {
      required,
      minLength: minLength(8),
    },
    department: { required },
    restaurant: { required },
    nif: {
      required,
      minLength: maxLength(9),
    },
  }
})

const v$ = useVuelidate(rules, editedEmployee)

// Function to handle form submission
async function handleSubmit() {
  // Validate the form fields
  const result = await v$.value.$validate()
  console.log('Form validation result:', result)
  if (!result) {
    // If there are errors in the form, show an alert indicating that the form is invalid
    alert('The form has errors')
    return
  } else {
    if (editedIndex.value > -1) {
      Object.assign(employees.value[editedIndex.value], editedEmployee)
    } else {
      employees.value.push({ ...editedEmployee })
    }
    close()
  }
}

function resetForm() {
  Object.assign(editedEmployee, defaultEmployee)
  editedIndex.value = -1
}

// Lifecycle hook
onMounted(() => {
  initialize()
})
</script>

<style scoped>
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
</style>
