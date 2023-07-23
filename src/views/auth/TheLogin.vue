<script setup>
import {ref} from "vue";
import TheInputField from "../../components/TheInputField.vue";
import VueLogo from "../../assets/vue.svg"

const username = ref('');
const password = ref('');


</script>

<template>
  <div class="row justify-content-center align-items-center">
    <div class="col-12 col-md-6 col-lg-5">
      <form>
        <div class="text-center">
          <img class="mb-4 " :src="VueLogo" alt="" width="72" height="57">
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
        </div>
        <TheInputField v-model="username" p-type="text" p-class="form-control" p-placeholder="Username" p-label="Username"
               p-required />
        <TheInputField v-model="password" p-type="password" p-class="form-control" p-placeholder="Password"
               p-label="Password" p-required />
        <Button class="btn btn-primary w-100 py-2"/>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>