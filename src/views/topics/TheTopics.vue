<script setup>
import {onMounted} from "vue";
import {useTopicsStore} from "../../stores/topics/fetchTopicsStore.js";
import {useAuthStore} from "../../stores/authStore.js";
import {useDeleteTopicsStore} from "../../stores/topics/deleteTopicStore.js";
import {useAccountsStore} from "../../stores/accountsStore.js";
import VueImage from "../../assets/vue.svg"
import BannerFramework from "../../components/BannerFramework.vue";
import TheLoader from "../../components/TheLoader.vue";
import TheModal from "../../components/TheModal.vue";


const user = useAccountsStore()
const topics = useTopicsStore()
const auth = useAuthStore()
const topic = useDeleteTopicsStore()


onMounted(async () => {
  await topics.fetchTopics()
  if (auth.token) {
    await user.profile()
  }
})

const deleteTopic = async (id) => {
  await topic.delete(id)
}


const showMyTopic = () => {
  if (auth.token) {
    topics.data = topics.data.filter(topic => topic?.starter?.username === user?.data?.username)
    return topics.data
  }
}
const showAll = async () => {
  if (auth.token) {
    await topics.fetchTopics()
  }
}
</script>

<template>
  <div class="p-3 bg-body rounded-4 shadow-sm">
    <BannerFramework />
    <div v-if="topics.loading" class="d-flex justify-content-center align-items-center py-5">
      <TheLoader p-class="spinner-border text-primary wh-7"/>
    </div>
    <div v-else class="table-responsive">
      <div class="d-flex flex-row justify-content-between align-items-center mb-4">
        <div class="p-2">
          <h5 class="pb-2 mb-0 text-center">{{ topics.total }} Topics</h5>
        </div>
        <div class="p-2">
          <button v-if="auth.token" class="btn btn-link me-4" @click="showMyTopic">My topics</button>
          <button v-if="auth.token" class="btn btn-link" @click="showAll">Show All</button>
        </div>
        <div class="p-2">
          <router-link to="/topic/add" class="btn btn-primary rounded-4">Add Topic</router-link>
        </div>
      </div>
      <table class="table table-borderless table-hover">
        <thead>
        <tr>
          <th scope="col">Topic</th>
          <th scope="col">Category</th>
          <th scope="col"></th>
          <th scope="col">Likes</th>
          <th scope="col">Dislikes</th>
          <th scope="col">Published</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(topic, index) in topics.data" :key="index">
          <th scope="row" class="fw-normal">
            <router-link :to="`/topic/${topic.id}`" class="text-dark text-decoration-none">
              {{ topic.subject }}
            </router-link>
          </th>
          <th class="fw-normal">{{ topic.category_name }}</th>
          <th>
            <img :src="topic.starter.avatar || VueImage" class="img-fluid rounded-5" width="35"
                 height="25" alt=""/>
          </th>
          <th class="fw-normal">{{ topic.upvote_count }}</th>
          <th class="fw-normal">{{ topic.downvote_count }}</th>
          <th class="fw-normal">{{ topic.created_data }}</th>
          <th>
            <TheModal v-if="auth.token ? user.data?.username === topic.starter?.username : false"
                      p-id="topic.id" p-text="Are you sure you want to delete it?" p-button="Delete"
                      :p-title="`Delete ${topic.subject}`"
                      pb-class="btn btn-danger rounded-4 btn-sm" @done="deleteTopic(topic.id)"/>
          </th>
          <th>
            <router-link v-if="auth.token ? user.data?.username === topic.starter?.username : false"
                         :to="`/topic/update/${topic.id}`" class="btn btn-info rounded-4 btn-sm">
              Update
            </router-link>
          </th>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
