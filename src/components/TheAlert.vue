<script setup>
const props = defineProps({
  pClass: {
    required: true,
    type: String,
  },
  pText: {
    required: true,
    type: String,
  },
})

defineEmits(['close'])
</script>

<template>
  <div  role="alert" :class="props.pClass">
    {{ pText }}
    <button type="button" class="btn-close" data-bs-dismiss="alert"  @click="$emit('close')" aria-label="Close"></button>
  </div>
</template>