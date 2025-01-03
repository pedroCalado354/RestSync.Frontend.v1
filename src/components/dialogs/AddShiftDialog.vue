<template>
  <v-dialog v-model="dialogVisible" max-width="800">
    <v-card class="dialog-card">
      <!-- Close Button with Icon (Right-Aligned) -->
      <v-btn icon class="close-button ml-auto" @click="close">
        <v-icon color="grey-darken-2">mdi-close</v-icon>
      </v-btn>

      <!-- Title Section -->
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5">Add New Shift</span>
      </v-card-title>

      <!-- Form Section -->
      <form>
        <v-row>
          <!-- Employee Name Field -->
          <v-col cols="12" md="6">
            <v-select
              v-model="shiftData.title"
              :items="['Lisandra', 'Pedro']"
              label="Employee Name"
              append-inner-icon="mdi-account"
              variant="solo-filled"
            ></v-select>
          </v-col>

          <!-- Description Field -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="shiftData.description"
              label="Description"
              append-inner-icon="mdi-information-outline"
              variant="solo-filled"
            ></v-text-field>
          </v-col>

          <!-- Date Picker -->
          <v-col cols="12">
            <v-date-input
              v-model="shiftData.date"
              label="Select a date"
              prepend-inner-icon="$calendar"
              variant="solo"
              multiple="range"
            ></v-date-input>
          </v-col>

          <!-- Color Picker -->
          <v-col cols="12">
            <v-select
              v-model="selectedColor"
              :items="colorOptions"
              item-title="label"
              item-value="value"
              label="Select a color"
              variant="outlined"
            >
              <template v-slot:prepend-item>
                <v-list-item
                  v-for="(color, index) in colorOptions"
                  :key="index"
                  class="d-flex align-center"
                >
                  <v-icon :style="{ color: color.value, marginRight: '8px' }" class="color-square">
                    mdi-checkbox-blank
                  </v-icon>
                  <span>{{ color.label }}</span>
                </v-list-item>
              </template>
            </v-select>
          </v-col>

          <!-- Time Pickers -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="shiftData.start"
              label="Start Time (HH:MM)"
              placeholder="HH:MM"
              variant="solo"
              maxlength="5"
              :rules="[validateTime]"
              @input="formatTime('startTime')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="shiftData.end"
              label="End Time (HH:MM)"
              placeholder="HH:MM"
              variant="solo"
              maxlength="5"
              :rules="[validateTime]"
              @input="formatTime('endTime')"
            ></v-text-field>
          </v-col>

          <!-- Days Off -->
          <v-col cols="12">
            <h4 class="text-subtitle-1">Select Days Off</h4>
            <v-row>
              <v-col
                v-for="(day, index) in weekdays"
                :key="index"
                cols="4"
                class="day-checkbox-container"
              >
                <v-checkbox
                  color="primary"
                  @update:modelValue="weekDaysOnChange"
                  v-model="selectedDays"
                  :label="day"
                  :value="day"
                  class="day-checkbox"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- Action Buttons -->
        <v-row>
          <v-col cols="12" class="dialog-actions d-flex justify-end">
            <v-btn color="green" text @click="addShift">
              <v-icon left>mdi-check</v-icon>
              Add
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      shiftData: {
        title: '',
        start: null,
        end: null,
        date: ref(new Date()),
        title: '',
        description: '',
        location: '',
      },
      selectedDays: ref([]),
      weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],

      selectedColor: null,
      colorOptions: [
        { label: 'Feriado', value: '#FF0000' },
        { label: 'Folga', value: '#00FF00' },
        { label: 'De Serviço', value: '#0000FF' },
      ],
    }
  },
  methods: {
    close() {
      this.$emit('update:dialogVisible', false)
    },
    validateTime(value) {
      timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
      return timePattern.test(value) || 'Invalid time format'
    },
    formatTime(field) {
      let value = this.shiftData[field].replace(/[^0-9]/g, '')
      if (value.length > 2) {
        value = value.slice(0, 2) + ':' + value.slice(2, 4)
      }
      this.shiftData[field] = value.slice(0, 5)
    },
    addShift() {
      this.$emit('add-shift', {
        shiftData: this.shiftData,
        selectedDays: this.selectedDays,
      })
    },
  },
}
</script>

<style scoped>
/* Style for fixed position dialog */
.v-card {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
}

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

/* Custom styling for the time picker */
.custom-time-picker {
  transform: scale(0.8); /* Scales the entire component to 50% of its original size */
  transform-origin: center; /* Ensures scaling happens from the center */
}

.custom-time-picker .v-picker {
  max-width: none; /* Allow dynamic scaling without cropping */
}

.custom-time-picker .v-picker__body {
  font-size: 0.75rem; /* Adjust font size for labels */
}

.custom-time-picker .v-input__control {
  height: auto; /* Ensure the input adjusts dynamically */
}
</style>
