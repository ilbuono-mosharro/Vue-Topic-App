<script setup>
import {useAuthStore} from "../stores/authStore.js";

const token = useAuthStore()

</script>

<template>
<h1>Home page {{token.token}}</h1>
</template>

<style scoped>

</style>