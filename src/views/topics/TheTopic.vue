<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";
import {useGetTopicStore} from "../../stores/topics/getTopicStore.js";
import {useAuthStore} from "../../stores/authStore.js";
import LikeImage from "../../assets/hand-thumbs-up.svg"
import DisLikeImage from "../../assets/hand-thumbs-down.svg"
import VueImage from "../../assets/vue.svg"
import TheLoader from "../../components/TheLoader.vue";

const route = useRoute()
const router = useRouter()
const topic = useGetTopicStore()
const auth = useAuthStore()

onMounted(async () => {
  await topic.get(Number(route.params.id))
})


const upVoteSubmit = async () => {
  if (auth.token) {
    await topic.upVote(Number(route.params.id), `Token ${auth.token}`)
  } else {
    await router.push({name: 'login', query: {redirect: route.fullPath}})
  }
}
const downVoteSubmit = async () => {
  if (auth.token) {
    await topic.downVote(Number(route.params.id), `Token ${auth.token}`)
  } else {
    await router.push({name: 'login', query: {redirect: route.fullPath}})
  }
}
</script>

<template>
  <div class="col-12">
    <div class="card border-0">
      <div v-if="topic.loading" class="d-flex justify-content-center align-items-center">
        <TheLoader p-class="spinner-border text-primary wh-7"/>
      </div>
      <div v-else class="card-body">
        <h1>{{ topic.data?.subject }}</h1>
        <p>{{ topic.data?.category.name }}</p>
        <div class="d-flex">
          <div class="flex-shrink-0">
            <img :src="topic.data?.starter?.avatar ? topic.data?.starter?.avatar : VueImage" alt="..."
                 class="img-fluid rounded-3" width="50" height="50">
          </div>
          <div class="flex-grow-1 ms-3 text-start">
            @{{ topic.data?.starter?.first_name }} {{ topic.data?.starter?.last_name }}
            <p>{{ topic.data?.body }}</p>
          </div>
        </div>
        <div class="d-flex flex-row">
          <div class="p-2">
            <div>
              <form @submit.prevent="upVoteSubmit">
                <button class="btn btn-light align-middle">
                   {{ topic.likes }} Likes
                  <img :src="LikeImage" alt=""/>
                </button>
              </form>
            </div>
          </div>
          <div class="p-2">
            <form @submit.prevent="downVoteSubmit">
              <button class="btn btn-light align-middle">
                {{ topic.dislike }} Dislikes
                <img :src="DisLikeImage" alt=""/>
              </button>
            </form>
          </div>
          <div class="p-2 ms-auto">
            <div>
              {{ topic.data?.created_data }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>