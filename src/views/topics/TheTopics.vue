<script setup>
import {onMounted} from "vue";
import {useTopicsStore} from "../../stores/topics/fetchTopicsStore.js";
import VueImage from "../../assets/vue.svg"
import BannerFramework from "../../components/BannerFramework.vue";
import TheLoader from "../../components/TheLoader.vue";


const topics = useTopicsStore()


onMounted(async () => {
  await topics.fetchTopics()
})
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
          <th class="fw-normal">{{ topic.category.name }}</th>
          <th>
            <img :src="topic.starter.avatar || VueImage" class="img-fluid rounded-5" width="35"
                 height="25" alt=""/>
          </th>
          <th class="fw-normal">{{ topic.upvote }}</th>
          <th class="fw-normal">{{ topic.downvote }}</th>
          <th class="fw-normal">{{ topic.created_at }}</th>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
