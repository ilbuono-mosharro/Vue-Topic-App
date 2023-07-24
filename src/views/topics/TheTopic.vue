<script setup>
import {useRoute} from "vue-router";
import {onMounted} from "vue";
import {useGetTopicStore} from "../../stores/topics/getTopicStore.js";


const route = useRoute()
const topic = useGetTopicStore()

onMounted(async () => {
  await topic.get(Number(route.params.id))
})


// const upVoteSubmit = async () => {
//   await topicStore.upvoteTopic(Number(route.params.id), `Token ${token}`)
// }
// const downVoteSubmit = async () => {
//   await topicStore.downvoteTopic(Number(route.params.id), `Token ${token}`)
// }

</script>

<template>
    <div class="col-12">
      <div class="card border-0">
        <div v-if="topic.loading" class="d-flex justify-content-center align-items-center">
          <Loader class-name="spinner-border text-primary wh-7"/>
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
                    {{ topic.upvote ? topic?.upvote : topic?.topic?.upvote_count }} Likes <img
                      :src="LikeImage" alt=""/>
                  </button>
                </form>
              </div>
            </div>
            <div class="p-2">
              <form @submit.prevent="downVoteSubmit">
                <button class="btn btn-light align-middle">
                  {{ topic.downvote ? topic?.downvote : topic?.topic?.downvote_count }} Dislikes <img
                    :src="DisLikeImage" alt=""/>
                </button>
              </form>
            </div>
            <div class="p-2 ms-auto">
              <div>
                {{ topic.topic?.created_data }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped>

</style>