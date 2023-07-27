<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useSignUpStore} from "../../stores/signUpStore.js";
import {useAlertStore} from "../../stores/alertStore.js";
import TheInputField from "../../components/TheInputField.vue";
import TheButton from "../../components/TheButton.vue";
import VueLogo from "../../assets/vue.svg";


const registration = useSignUpStore()
const alert = useAlertStore()
const router = useRouter()

const username = ref('')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const password1 = ref('')
const errors = ref('')

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
    await router.push({name: 'info'})
  } else {
    alert.addAlert('Please fill in all fields correctly and try again.')
  }
}
</script>

<template>
  <div class="col-12 col-md-6 col-lg-5">
    <form @submit.prevent="handleSignUp" class="py-4">
      <div class="text-center">
        <img class="mb-4 " :src="VueLogo" alt="" width="72" height="57">
        <h1 class="h3 mb-3 fw-normal">Sign Up</h1>
      </div>
      <TheInputField v-model="username" p-type="text" p-class="form-control" p-placeholder="Username"
                     p-label="Username" p-id="id_username" p-required/>
      <p v-if="registration.error?.username" class="text-danger" ref="errors">{{ registration.error?.username[0] }}</p>
      <TheInputField v-model="firstName" p-type="text" p-class="form-control" p-placeholder="First Name"
                     p-label="First Name" p-id="id_first_name" p-required/>
      <p v-if="registration.error?.first_name" class="text-danger">{{ registration.error?.first_name[0] }}</p>
      <TheInputField v-model="lastName" p-type="text" p-class="form-control" p-placeholder="Last Name"
                     p-label="Last Name" p-id="id_last_name" p-required/>
      <p v-if="registration.error?.last_name" class="text-danger">{{ registration.error?.last_name[0] }}</p>
      <TheInputField v-model="email" p-type="email" p-class="form-control" p-placeholder="email" p-label="email"
                     p-id="id_email" p-required/>
      <p v-if="registration.error?.email" class="text-danger">{{ registration.error?.email[0] }}</p>
      <TheInputField v-model="password" p-type="password" p-class="form-control" p-placeholder="Password"
                     p-label="Password" p-id="id_password" p-required/>
      <p v-if="registration.error?.password" class="text-danger">{{ registration.error?.password[0] }}</p>
      <TheInputField v-model="password1" p-type="password" p-class="form-control" p-placeholder="Repeat Password"
                     p-label="Repeat Password" p-id="id_password1" p-required/>
      <p v-if="registration.error?.password1" class="text-danger">{{ registration.error?.password1[0] }}</p>
      <p v-if="registration.error?.non_field_errors" class="text-danger">
        {{ registration.error?.non_field_errors[0] }}
      </p>
      <TheButton p-class="btn btn-primary w-100 py-2" p-type="submit"
                 :p-text="registration.loading ? 'I\'m checking your data' : 'Sign up'"
                 :p-disabled="registration.loading"/>
    </form>
  </div>
</template>

<style scoped>

</style>