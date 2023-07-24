<script setup>
import {useTopicsStore} from "../../stores/topics/fetchTopicsStore.js";
import {useDeleteTopicsStore} from "../../stores/topics/deleteTopicStore.js";
import {onMounted} from "vue";
import VueImage from "../../assets/vue.svg"
import BannerFramework from "../../components/BannerFramework.vue";

const topics = useTopicsStore()
const topic = useDeleteTopicsStore()
// const user = useRegistrationStore()


onMounted(async () => {
  await topics.fetchTopics()
  // if (token) {
  //     await user.userProfile(`Token ${token}`)
  // }
})

const deleteTopic = async (id) => {
  await topic.delete(id)
}
//
//
// const showMyTopic = () => {
//     if (token) {
//         topicStore.data = topicStore.data.filter(topic => user?.profile?.username === topic?.starter?.username)
//         return topicStore.data
//     }
// }
// const showAll = async () => {
//     if (token) {
//         await topicStore.fetchTopics()
//     }
// }
</script>

<template>
  <div class="p-3 bg-body rounded-4 shadow-sm">
   <BannerFramework />
    <!--        <div v-if="topicStore.loading" class="d-flex justify-content-center align-items-center">-->
    <!--            <Loader class-name="spinner-border text-primary wh-7"/>-->
    <!--        </div>-->
    <div class="table-responsive">
      <div class="d-flex flex-row justify-content-between align-items-center mb-4">
        <div class="p-2">
          <h5 class="pb-2 mb-0 text-center">{{ topics.total }} Topics</h5>
        </div>
        <div class="p-2">
          <!--                    <button v-if="token" class="btn btn-link me-4" @click="showMyTopic">My topics</button>-->
          <!--                    <button v-if="token" class="btn btn-link" @click="showAll">Show All</button>-->
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
            <form @submit="deleteTopic(topic.id)">
              <button class="btn btn-danger rounded-4 btn-sm">Delete</button>
            </form>
          </th>
          <th>
            <router-link :to="`/topic/update/${topic.id}`" class="btn btn-info rounded-4 btn-sm">Update</router-link>
          </th>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.wh-7 {
  width: 7rem;
  height: 7rem;
}

</style>