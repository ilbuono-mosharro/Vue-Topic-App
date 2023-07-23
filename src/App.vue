<script setup>
import BaseLayout from "./components/BaseLayout.vue";
import TheNavigation from "./components/TheNavigation.vue";
</script>

<template>
<BaseLayout>
  <template #header>
   <TheNavigation />
  </template>
  <template #default>
    <router-view :key="$route.path"></router-view>
  </template>
  <template #footer>
    <p class="mt-5 mb-3 text-body-secondary text-center">&copy; 2017–2023</p>
  </template>
</BaseLayout>

</template>

<style scoped>

</style>
