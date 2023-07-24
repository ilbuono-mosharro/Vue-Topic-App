<script setup>
const props = defineProps({
  pClass: {
    required: true,
    type: String,
  }

})
</script>

<template>
  <div :class="props.pClass" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<style scoped>

</style>