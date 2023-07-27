<script setup>
import {useAccountsStore} from "../../stores/accountsStore.js";
import {useAuthStore} from "../../stores/authStore.js";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import VueLogo from '../../assets/vue.svg'
import TheInputField from "../../components/TheInputField.vue";
import TheButton from "../../components/TheButton.vue";
import TheLoader from "../../components/TheLoader.vue";
import {useAlertStore} from "../../stores/alertStore.js";


const route = useRouter()
const user = useAccountsStore()
const auth = useAuthStore()
const alert = useAlertStore()

const firstName = ref('')
const lastName = ref('')
const avatarFile = ref('')

onMounted(async () => {
  await user.profile(`Token ${auth.token}`)
  firstName.value = user.data.first_name
  lastName.value = user.data.last_name
})

const handleDelete = async () => {
  await user.delete(`Token ${auth.token}`)
  localStorage.removeItem("token")
  auth.$reset()
  await route.push('/deleted')
}

const onAvatarChange = (e) => {
  avatarFile.value = e.target.files[0]
}

const handleUpdate = async () => {
  const formData = new FormData()
  formData.append('first_name', firstName.value)
  formData.append('last_name', lastName.value)
  formData.append('avatar', avatarFile.value)
  await user.update(
      `Token ${auth.token}`,
      formData,
  )
  alert.addAlert('Your profile has been updated successfully.')
}


</script>

<template>
  <div v-if="user.loading" class="d-flex justify-content-center align-items-center">
    <TheLoader p-class="spinner-border text-primary wh-7"/>
  </div>
  <div v-else class="row">
    <div class="col-12 col-md-4">
      <div class="card border-0 py-4">
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item mb-4">
              <img :src="user.data?.avatar ? user.data?.avatar : VueLogo" class="card-img-top rounded-4" alt="..."
                   width="150"
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
    <div class="col-12 col-md-8">
      <div class="card border-0 py-4">
        <div class="card-body">
          <h5 class="card-title mb-4">Update your profile</h5>
          <form @submit.prevent="handleUpdate" enctype="multipart/form-data">
            <div class="mb-3">
              <label for="formFile" class="form-label">Change your photo</label>
              <input class="form-control" @change="onAvatarChange" type="file" accept="image/" id="formFile">
            </div>
            <TheInputField v-model="firstName" p-id="id_first_name" p-label="First Name" p-class="form-control"
                           p-placeholder="First Name" p-type="text"/>
            <p v-if="user.error?.first_name" class="text-danger">{{ user.error?.first_name[0] }}</p>
            <TheInputField v-model="lastName" p-id="id_last_name" p-label="Last Name" p-class="form-control"
                           p-placeholder="Last Name" p-type="text"/>
            <p v-if="user.error?.last_name" class="text-danger">{{ user.error?.last_name[0] }}</p>
            <TheButton p-text="Update" p-type="submit" p-class="btn btn-primary"/>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>