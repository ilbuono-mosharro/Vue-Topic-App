<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useSignUpStore} from "../../stores/signUpStore.js";
import TheAlert from "../../components/TheAlert.vue";
import TheInputField from "../../components/TheInputField.vue";
import TheButton from "../../components/TheButton.vue";
import VueLogo from "../../assets/vue.svg";


const registration = useSignUpStore()
const router = useRouter()

const username = ref('')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const password1 = ref('')
const closeButton = ref(false)

const closeAlert = () => closeButton.value = false
const handleSignUp = async () => {
  await registration.signUp({
    username: username.value,
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    password: password.value,
    password1: password1.value,
  })
  if (registration.data) {
    registration.$reset()
    await router.push({name: 'sgMessagge'})
  } else {
    closeButton.value = true
  }
}
</script>

<template>
    <div class="col-12 col-md-6 col-lg-5">
      <TheAlert v-if="registration.error && closeButton" p-class="alert alert-warning alert-dismissible fade show"
                @close="closeAlert" p-text="Please fill in all fields correctly and try again."/>
      <form @submit.prevent="handleSignUp" class="py-4">
        <div class="text-center">
          <img class="mb-4 " :src="VueLogo" alt="" width="72" height="57">
          <h1 class="h3 mb-3 fw-normal">Sign Up</h1>
        </div>
        <TheInputField v-model="username" p-type="text" p-class="form-control" p-placeholder="Username"
                       p-label="Username" p-required/>
        <p v-if="registration?.error?.username" class="text-danger">{{ registration?.error?.username[0] }}</p>
        <TheInputField v-model="firstName" p-type="text" p-class="form-control" p-placeholder="First Name"
                       p-label="First Name" p-required/>
        <TheInputField v-model="lastName" p-type="text" p-class="form-control" p-placeholder="Last Name"
                       p-label="Last Name" p-required/>
        <TheInputField v-model="email" p-type="email" p-class="form-control" p-placeholder="email" p-label="email"
                       p-required/>
        <p v-if="registration?.error?.email" class="text-danger">{{ registration?.error?.email[0] }}</p>
        <TheInputField v-model="password" p-type="password" p-class="form-control" p-placeholder="Password"
                       p-label="Password" p-required/>
        <TheInputField v-model="password1" p-type="password" p-class="form-control" p-placeholder="Repeat Password"
                       p-label="Repeat Password" p-required/>
        <p v-if="registration?.error?.non_field_errors" class="text-danger">
          {{ registration?.error?.non_field_errors[0] }}
        </p>
        <TheButton p-class="btn btn-primary w-100 py-2" p-type="submit"
                   :p-text="registration.loading ? 'I\'m checking your data' : 'Sign up'"
                   :p-disabled="registration.loading"/>
      </form>
    </div>
</template>

<style scoped>

</style>