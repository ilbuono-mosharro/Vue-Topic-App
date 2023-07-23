<script setup>
const props = defineProps({
  pClass: {
    required: true,
    type: String
  },
  pType: {
    required: true,
    type: String,
  },
  pText: {
    required: true,
    type: String,
  },
  pDisabled: {
    type: Boolean,
  },
})
</script>

<template>
  <button :class="props.pClass" :type="props.pType" :disabled="props.pDisabled">
    {{ pText }}
  </button>
</template>

<style scoped>

</style>