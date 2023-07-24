<script setup>
import { ref } from 'vue'
const props = defineProps({
  pId: {
    required: true,
    type: String,
},
  pTitle: {
    required: true,
    type: String,
  },
  pText: {
    required: true,
    type: String,
  },
  pButton: {
    required: true,
    type: String,
  },
  pbClass: {
    required: true,
    type: String,
  }
})
const open = ref(false)

defineEmits(['done'])

</script>

<template>
  <button @click="open = true" :data-modal-target="props.pId" :class="props.pbClass">{{pButton}}</button>

  <Teleport to="body">
    <div v-if="open" class="modal-my card shadow" :id="props.pId">
      <div class="card-header h5">
        {{ props.pTitle }}
      </div>
      <div class="card-body">
      <p>{{props.pText}}</p>
      <div class="d-flex flex-row">
        <div class="p-1">
          <form @submit="$emit('done')">
            <button type="submit" class="btn btn-primary rounded-4">Yes</button>
          </form>
        </div>
        <div class="p-1">
          <button @click="open = false" class="btn btn-success rounded-4">No</button>
        </div>
      </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-my {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>