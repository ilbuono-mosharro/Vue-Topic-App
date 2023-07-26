<script setup>
import {ref} from "vue";
import {useAuthStore} from "../stores/authStore.js";
import {useRouter} from "vue-router";

const showMenu = ref(false)

const authentication = useAuthStore()
const router = useRouter()

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const handleLogOut = async () => {
  await authentication.logOut()
  await router.push({name: 'logout'})
}
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark container rounded py-3" aria-label="Main navigation">
    <div class="container">
      <router-link class="navbar-brand" to="/">Vue Topics</router-link>
      <button class="navbar-toggler p-0 border-0 rounded-4" :class="{ 'collapsed' : showMenu}" type="button" @click="toggleMenu"
              id="navbarSideCollapse" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse offcanvas-collapse collapse flex-row" :class="{'show': showMenu}"
           id="navbarsExampleDefault">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item ms-auto">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
        </ul>
        <div v-if="authentication.token">
          <router-link to="/user-topics" class="btn btn-success rounded-4 me-3">My Topics</router-link>
          <router-link to="/profile" class="btn btn-success rounded-4 me-3">Profile</router-link>
          <button class="btn btn-secondary rounded-4" @click="handleLogOut">Log out</button>
        </div>
        <div v-else class="button d-flex justify-content-end">
          <router-link to="/sign-up" class="btn btn-warning rounded-4 me-3">Sign Up</router-link>
          <router-link to="/login" class="btn btn-primary rounded-4">Login</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>