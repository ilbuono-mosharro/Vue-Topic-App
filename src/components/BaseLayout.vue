<script setup>
import TheAlert from "./TheAlert.vue";
import {useAlertStore} from "../stores/alertStore.js";

const alert = useAlertStore()

const closeAlert = () => {
  alert.show = false
  alert.message = ''
}
</script>

<template>
  <header>
    <slot name="header"></slot>
  </header>
  <main class="container mt-4">
    <TheAlert v-if="alert.show" :p-text="alert.message"
              :p-class="{ show: alert.show}" @close="closeAlert"/>
    <div class="row justify-content-center align-items-center bg-body">
      <slot></slot>
    </div>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</template>

<style>
body {
  padding-top: 56px;
}
</style>