<script setup>
import {onMounted} from "vue";
import {useTopicsStore} from "../../stores/topics/fetchTopicsStore.js";
import BannerFramework from "../../components/BannerFramework.vue";
import TheLoader from "../../components/TheLoader.vue";
import TheTable from "../../components/TheTable.vue";


const topics = useTopicsStore()


onMounted(async () => {
  await topics.fetchTopics()
})
</script>

<template>
  <div class="p-3 bg-body rounded-4 shadow-sm">
    <BannerFramework p-class="bg-primary" />
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
      <TheTable :options="topics.data" />
    </div>
  </div>
</template>
