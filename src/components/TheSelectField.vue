<script setup>
const props = defineProps({
  options: {
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  }
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-floating mb-4">
    <select class="form-select" id="floatingSelect" @change="$emit('update:modelValue', $event.target.value )"
            aria-label="Floating label select example" required >
      <option disabled selected>Please select one</option>
      <option v-for="(option, index) in props.options" :key="index" :value="option.id">
        {{ option.name }}
      </option>
    </select>
    <label for="floatingSelect">Choose the category</label>
  </div>
</template>

<style scoped>

</style>