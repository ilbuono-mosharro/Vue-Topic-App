<script setup>
const props = defineProps({
  pType: {
    required: true,
    type: String,
  },
  pPlaceholder: {
    required: true,
    type: String,
  },
  pRequired: {
    type: Boolean,
  },
  pClass: {
    required: true,
    type: String,
  },
  pLabel: {
    required: true,
    type: String,
  },
  pId: {
    required: true,
    type: String,
  },
  modelValue: {
    required: true,
    type: String,
  },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-floating mb-4">
    <input :type="props.pType" :class="props.pClass" :value="props.modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           :placeholder="props.pPlaceholder" :required="props.pRequired" :id="props.pId">
    <label :for="props.pId">{{ pLabel }}</label>
  </div>
</template>

<style scoped>

</style>