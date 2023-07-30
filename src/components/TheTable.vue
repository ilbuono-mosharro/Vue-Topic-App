<script setup>
import VueImage from "../assets/vue.svg";

const props = defineProps({
  options: {
    required: true,
  },
})
</script>

<template>
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
    <tr v-if="props.options.length > 0" v-for="(topic, index) in props.options" :key="index">
      <td class="fw-normal">
        <router-link :to="`/topic/${topic.id}`" class="text-dark text-decoration-none">
          {{ topic.subject }}
        </router-link>
      </td>
      <td class="fw-normal">{{ topic.category }}</td>
      <td>
        <img :src="topic.starter.avatar || VueImage" class="img-fluid rounded-5" width="35"
             height="25" alt=""/>
      </td>
      <td class="fw-normal">{{ topic.upvote }}</td>
      <td class="fw-normal">{{ topic.downvote }}</td>
      <td class="fw-normal">{{ topic.created_at }}</td>
      <slot :id="topic.id" :subject="topic.subject"></slot>
    </tr>
    <tr v-else>
      <td colspan="6" class="text-center p-5 h5">There is no data available.</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>