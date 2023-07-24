<script setup>
import BaseLayout from "./components/BaseLayout.vue";
import TheNavigation from "./components/TheNavigation.vue";
import TheAlert from "./components/TheAlert.vue";
import {useAlertStore} from "./stores/alertStore.js";

const alert = useAlertStore()

const closeAlert = () => {
  alert.show = false
  alert.message = ''
}
</script>

<template>
  <BaseLayout>
    <template #header>
      <TheNavigation/>
    </template>
    <template #default>
      <TheAlert v-if="alert.show" :p-text="alert.message"
                p-class="alert alert-success alert-dismissible fade show" @close="closeAlert"/>
      <router-view :key="$route.path"></router-view>
    </template>
    <template #footer>
      <p class="mt-5 mb-3 text-body-secondary text-center">&copy; 2017–2023</p>
    </template>
  </BaseLayout>

</template>

<style scoped>

</style>
