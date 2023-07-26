<script setup>
import {onMounted} from "vue";
import {useAuthStore} from "../../stores/authStore.js";
import {useDeleteTopicsStore} from "../../stores/topics/deleteTopicStore.js";
import {useUserTopicsStore} from "../../stores/topics/userTopicsStore.js";
import BannerFramework from "../../components/BannerFramework.vue";
import TheLoader from "../../components/TheLoader.vue";
import TheModal from "../../components/TheModal.vue";
import TheTable from "../../components/TheTable.vue";


const topics = useUserTopicsStore()
const auth = useAuthStore()
const topic = useDeleteTopicsStore()


onMounted(async () => {
  await topics.userTopics(`Token ${auth.token}`)
})

const deleteTopic = async (id) => {
  await topic.delete(id)
}

</script>

<template>
  <div class="p-3 bg-body rounded-4 shadow-sm">
    <BannerFramework p-class="bg-warning" />
    <div v-if="topics.loading" class="d-flex justify-content-center align-items-center py-5">
      <TheLoader p-class="spinner-border text-primary wh-7"/>
    </div>
    <div v-else class="table-responsive">
      <div class="d-flex flex-row justify-content-between align-items-center mb-4">
        <div class="p-2">
          <h5 class="pb-2 mb-0 text-center"> Topics</h5>
        </div>
        <div class="p-2">
          <RouterLink to="/" class="btn btn-outline-warning rounded-4">Show all topics</RouterLink>
        </div>
        <div class="p-2">
          <router-link to="/topic/add" class="btn btn-primary rounded-4">Add Topic</router-link>
        </div>
      </div>
      <TheTable :options="topics.data" v-slot="slotProps">
        <td>
          <TheModal p-id="topic.id" p-text="Are you sure you want to delete it?" p-button="Delete"
                    :p-title="`Delete ${slotProps.subject}`" pb-class="btn btn-danger rounded-4 btn-sm"
                    @done="deleteTopic(slotProps.id)"/>
        </td>
        <td>
          <router-link :to="`/topic/update/${slotProps.id}`" class="btn btn-info rounded-4 btn-sm">
            Update
          </router-link>
        </td>
      </TheTable>
    </div>
  </div>
</template>
