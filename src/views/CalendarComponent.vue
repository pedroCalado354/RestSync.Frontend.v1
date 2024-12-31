<!-- Child Component (CalendarComponent.vue) -->
<template>
  <div>
    <slot name="monthEvent" :eventData="eventData"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventData: { title: 'Sample Event' },
    }
  },
}
</script>
