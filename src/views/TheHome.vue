<script setup>
import {useAuthStore} from "../stores/authStore.js";

const authentication = useAuthStore()
console.log(authentication.token + " home page")
</script>

<template>
<h1>Home page {{authentication.token}}</h1>
</template>

<style scoped>

</style>