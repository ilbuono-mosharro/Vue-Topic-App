<script setup>
import {useAccountsStore} from "../../stores/accountsStore.js";
import {useAuthStore} from "../../stores/authStore.js";
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import VueLogo from '../../assets/vue.svg'


const route = useRouter()
const user = useAccountsStore()
const auth = useAuthStore()

onMounted(async () => {
  await user.profile()
})

const handleDelete = async () => {
  await user.delete()
  localStorage.removeItem("token")
  auth.$reset()
  await route.push('/deleted')
}


</script>

<template>
  <div class="col-6">
    <div class="card border-0 py-4">
      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item mb-4">
            <img :src="user.data?.avatar ? user.data?.avatar : VueLogo" class="card-img-top rounded-4" alt="..." width="150"
                 height="150">
          </li>
          <li class="list-group-item">Username: {{ user.data?.username }}</li>
          <li class="list-group-item">First Name: {{ user.data?.first_name }}</li>
          <li class="list-group-item">Last Name: {{ user.data?.last_name }}</li>
          <li class="list-group-item">Email: {{ user.data?.email }}</li>
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