<script setup>
import {ref} from "vue";
import TheInputField from "../../components/TheInputField.vue";
import TheButton from "../../components/TheButton.vue";
import VueLogo from "../../assets/vue.svg"
import TheAlert from "../../components/TheAlert.vue";
import {useAuthStore} from "../../stores/authStore.js";
import {useRouter} from "vue-router";

const router = useRouter()
const login = useAuthStore()

const username = ref('');
const password = ref('');
const closeButton = ref(false)

const closeAlert = () => closeButton.value = false

const handleLoginSubmit = async () => {
  await login.authentication({username: username.value, password: password.value})
  const token = login.token

  if (token) {
    await router.push("/")
  } else {
    closeButton.value = true
  }
}

</script>

<template>
    <div class="col-12 col-md-6 col-lg-5">
      <TheAlert v-if="login.error && closeButton" p-class="alert alert-warning alert-dismissible fade show"
             @close="closeAlert" p-text="Unable to log in with provided credentials."/>
      <form @submit.prevent="handleLoginSubmit">
        <div class="text-center">
          <img class="mb-4 " :src="VueLogo" alt="" width="72" height="57">
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
        </div>
        <TheInputField v-model="username" p-type="text" p-class="form-control" p-placeholder="Username" p-label="Username"
               p-required />
        <TheInputField v-model="password" p-type="password" p-class="form-control" p-placeholder="Password"
               p-label="Password" p-required />
        <TheButton p-class="btn btn-primary w-100 py-2" p-type="submit" p-text="Login"/>
      </form>
    </div>
</template>

<style scoped>

</style>