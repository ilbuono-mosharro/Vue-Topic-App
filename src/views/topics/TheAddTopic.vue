<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import {useAddTopicStore} from "../../stores/topics/addTopicStore.js";
import {useCategoryStore} from "../../stores/categoryStore.js";
import {useAlertStore} from "../../stores/alertStore.js";
import VueLogo from "../../assets/vue.svg";
import TheButton from "../../components/TheButton.vue";
import TheInputField from "../../components/TheInputField.vue";


const topic = useAddTopicStore()
const categories = useCategoryStore()
const alert = useAlertStore()
const router = useRouter()

const subject = ref("")
const category = ref("")
const body = ref("")


const handleAddTopic = async () => {
  await topic.add({
    subject: subject.value,
    category: category.value,
    body: body.value,
  })
  if (topic.data) {
    topic.$reset()
    await router.push({name: "home"})
    alert.addAlert("You have successfully added a topic.")
  } else {
    alert.addAlert("Please fill in all fields correctly and try again.")
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
    <form @submit.prevent="handleAddTopic" class="py-4">
      <div class="text-center">
        <img class="mb-4 " :src="VueLogo" alt="" width="72" height="57">
        <h1 class="h3 mb-3 fw-normal">Add a topic</h1>
      </div>
      <TheInputField v-model="subject" p-type="text" p-class="form-control" p-placeholder="Subject" p-id="id_subject"
                     p-label="Subject" p-required/>
      <p v-if="topic?.error?.subject" class="text-danger">{{ topic?.error?.subject[0] }}</p>
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
                     p-id="id_body" p-label="Description" p-required/>
      <TheButton p-class="btn btn-primary w-100 py-2" p-type="submit"
                 :p-text="topic.loading ? 'I am sending the data' : 'Add'"
                 :p-disabled="!!topic.loading"/>
    </form>
  </div>
</template>

<style scoped>

</style>