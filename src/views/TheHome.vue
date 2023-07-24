<script setup>
import VueImage from ".././assets/vue.svg"
import TheTopics from "./topics/TheTopics.vue";
import TheAlert from "../components/TheAlert.vue";
import {useAlertStore} from "../stores/alertStore.js";
import {ref} from "vue";

const closeButton = ref(true)

const alert = useAlertStore()
const closeAlert = () => {
  closeButton.value = false
  alert.show = false
  alert.message = ''
}
</script>

<template>
  <div class="d-flex align-items-center justify-content-around flex-row p-3 my-3 text-white bg-warning rounded shadow-sm">
    <div class="lh-1">
      <img class="me-3" :src="VueImage" alt="" width="100" height="38">
      <h1 class="h6 mb-0 text-white lh-1">Rest Framework</h1>
    </div>
    <div class="lh-1">
      <img class="me-3" :src="VueImage" alt="" width="48" height="40">
      <h1 class="h6 mb-0 text-white lh-1">Vue js</h1>
    </div>
  </div>
  <TheAlert v-if="alert.show && closeButton" :p-text="alert.message"
            p-class="alert alert-success alert-dismissible fade show" @close="closeAlert" />
  <TheTopics />
</template>

<style scoped>

</style>