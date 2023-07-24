<script setup>
import {useAccountsStore} from "../../stores/accountsStore.js";
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import VueLogo from '../../assets/vue.svg'
import {useAuthStore} from "../../stores/authStore.js";



const route = useRouter()
const user = useAccountsStore()
const auth = useAuthStore()

onMounted(async () => {
  await user.profile()
})

const handleDelete = async () => {
  await user.delete()
  localStorage.removeItem("token")
  auth.token = null
  await route.push('/deleted')
}


</script>

<template>
    <div class="col-6">
      <div class="card border-0">
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <img :src="user.profile?.avatar ? user.profile?.avatar : VueLogo" class="card-img-top" alt="..." width="200" height="300">
            </li>
            <li class="list-group-item">Username: {{user.profile?.username}}</li>
            <li class="list-group-item">First Name: {{user.profile?.first_name}}</li>
            <li class="list-group-item">Last Name: {{user.profile?.last_name}}</li>
            <li class="list-group-item">Email: {{user.profile?.email}}</li>
            <li class="list-group-item">
              <button class="btn btn-danger" @click="handleDelete">Delete your account</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>