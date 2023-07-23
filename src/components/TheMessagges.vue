<script setup>
const props = defineProps({
  pClass: {
    required: true,
    type: String,
  },
  pHtext: {
    required: true,
    type: String,
  },
  pText: {
    required: true,
    type: String,
  },
  pTo: {
    required: true,
    type: String,
  },
  pLinkText : {
    required: true,
    type: String,
  },
})
</script>

<template>
  <div :class="props.pClass" role="alert">
    <h4 class="alert-heading">{{props.pHtext}}</h4>
    <p>{{props.pText}}</p>
    <hr>
    <router-link :to="props.pTo" class="text-decoration-underline text-success">
     {{props.pLinkText}}
    </router-link>
  </div>
</template>

<style scoped>

</style>