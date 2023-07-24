<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {useUpdateTopicsStore} from "../../stores/topics/updateTopicStore.js";
import {useGetTopicStore} from "../../stores/topics/getTopicStore.js";
import {useCategoryStore} from "../../stores/categoryStore.js";
import VueLogo from "../../assets/vue.svg";
import TheInputField from "../../components/TheInputField.vue";
import TheButton from "../../components/TheButton.vue";

const topic = useUpdateTopicsStore()
const single = useGetTopicStore()
const categories = useCategoryStore()
const route = useRoute()

const subject = ref('')
const category = ref('')
const body = ref('')


onMounted( async () => {
  await single.get(Number(route.params.id))
  await categories.fetchCategories()
  subject.value = single.data.subject
  category.value = single.data.category
  body.value = single.data.body
    }
)
const handleUpdateTopic = async () => {
  await topic.update(Number(route.params.id), {
    subject: subject.value,
    category: category.value,
    body: body.value,
  })
}
</script>

<template>
  <div class="row justify-content-center align-items-center">
    <div class="col-12 col-md-6 col-lg-5">
      <form @submit.prevent="handleUpdateTopic">
        <div class="text-center">
          <img class="mb-4 " :src="VueLogo" alt="" width="72" height="57">
          <h1 class="h3 mb-3 fw-normal">Update the topic</h1>
        </div>
        <TheInputField v-model="subject" p-type="text" p-class="form-control" p-placeholder="Subject" p-label="Subject"
                       p-id="id_subject" p-required/>
        <div class="form-floating mb-4">
          <select class="form-select" id="floatingSelect" v-model="category" aria-label="Floating label select example">
            <option disabled value="">Please select one</option>
            <option v-for="(category, index) in categories.data" :key="index" :value="category.id">{{category.name}}</option>
          </select>
          <label for="floatingSelect">Choose the category</label>
        </div>
        <TheInputField v-model="body" p-type="textarea" p-class="form-control" p-placeholder="Description"
                       p-label="Description" p-id="id_body" p-required />
        <TheButton p-class="btn btn-primary w-100 py-2" p-type="submit"
                :p-text="topic.loading ? 'I am updateded the data' : 'Add'"
                :p-disabled="!!topic.loading"/>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>