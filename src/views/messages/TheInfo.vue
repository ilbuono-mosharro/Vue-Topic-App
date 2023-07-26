<script setup>
import TheMessage from "../../components/TheMessage.vue";
</script>

<template>
  <TheMessage p-class="alert alert-success" p-htext="Well done!" p-text="You have registered successfully."
                p-to="/login" p-link-text="Go to the login page."/>
</template>

<style scoped>

</style>