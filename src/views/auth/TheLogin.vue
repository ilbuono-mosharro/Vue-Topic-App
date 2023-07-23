<script setup>
import {ref} from "vue";
import TheInputField from "../../components/TheInputField.vue";
import TheButton from "../../components/TheButton.vue";
import VueLogo from "../../assets/vue.svg"
import {useAuthStore} from "../../stores/authStore.js";
import {useRouter} from "vue-router";

const router = useRouter()
const login = useAuthStore()

const username = ref('');
const password = ref('');

const handleLoginSubmit = async () => {
  await login.authentication({username: username.value, password: password.value})
  const token = login.token
  console.log(token)

  if (token) {
    await router.push("/")
  }
}

</script>

<template>
    <div class="col-12 col-md-6 col-lg-5">
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