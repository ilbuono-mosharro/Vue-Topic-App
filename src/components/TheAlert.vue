<script setup>
import VueLogo from '.././assets/vue.svg'

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
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="liveToast" class="toast fade" :class="pClass" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <img :src="VueLogo" class="rounded me-2" alt="...">
        <strong class="me-auto">Notification</strong>
        <button type="button" class="btn-close" @click="$emit('close')" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        {{ pText }}
      </div>
    </div>
  </div>
</template>