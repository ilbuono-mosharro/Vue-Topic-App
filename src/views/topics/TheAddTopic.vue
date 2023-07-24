<script setup>
import {ref, onMounted} from "vue";
import {useTopicsStore} from "../../stores/topicStore.js";
import {useCategoryStore} from "../../stores/categoryStore.js";
import {useRouter} from "vue-router";
import VueLogo from "../../assets/vue.svg";
import TheAlert from "../../components/TheAlert.vue";
import TheButton from "../../components/TheButton.vue";
import TheInputField from "../../components/TheInputField.vue";
import {useAlertStore} from "../../stores/alertStore.js";

const topic = useTopicsStore()
const categories = useCategoryStore()
const router = useRouter()
const alert =useAlertStore()

const subject = ref("")
const category = ref("")
const body = ref("")
const closeButton = ref(false)
const closeAlert = () => closeButton.value = false
const handleAddTopic = async () => {
  await topic.addTopic({
    subject: subject.value,
    category: category.value,
    body: body.value,
  })
  if (topic.added) {
    await router.push({name: "home"})
    alert.addAlert("You have successfully added a topic.")
  }
}
onMounted(
    async () => {
      await categories.fetchCategories()
    }
)
</script>

<template>
    <div class="col-12 col-md-6 col-lg-5">
      <TheAlert v-if="topic.added && closeButton" p-class="alert alert-success alert-dismissible fade show"
             @close="closeAlert" p-text="You have successfully added a topic."/>

      <form @submit.prevent="handleAddTopic">
        <div class="text-center">
          <img class="mb-4 " :src="VueLogo" alt="" width="72" height="57">
          <h1 class="h3 mb-3 fw-normal">Add a topic</h1>
        </div>
        <TheInputField v-model="subject" p-type="text" p-class="form-control" p-placeholder="Subject"
                       p-label="Subject" p-required />
        <div class="form-floating mb-4">
          <select class="form-select" id="floatingSelect" v-model="category" aria-label="Floating label select example"
                  required>
            <option disabled value="">Please select one</option>
            <option v-for="(category, index) in categories.data" :key="index" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <label for="floatingSelect">Choose the category</label>
        </div>
        <TheInputField v-model="body" p-type="textarea" p-class="form-control" p-placeholder="Description"
               p-label="Description" p-required />
        <TheButton p-class="btn btn-primary w-100 py-2" p-type="submit"
                :p-text="topic.loading ? 'I am loading data' : 'Add'"
                :p-disabled="!!topic.loading"/>
      </form>
    </div>
</template>

<style scoped>

</style>