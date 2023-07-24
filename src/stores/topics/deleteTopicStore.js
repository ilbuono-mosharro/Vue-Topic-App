import {defineStore} from 'pinia'
import axios from "axios";
import {useAuthStore} from "../authStore.js";

const base_url = "http://127.0.0.1:8000/api"


export const useDeleteTopicsStore = defineStore('deleteTopicStore', {
    state: () => (
        {
            data: null,
            loading: false,
            error: null,
        }
    ),
    actions: {
        async deleteTopic(id, token) {
            try {
                const auth = useAuthStore()
                const response = await axios.delete(`${base_url}/topics/${id}/`, {
                    headers: {
                        "Authorization": `Token ${auth.token}`,
                    },
                })
                this.data = response.data
            } catch (e) {
                this.error = e.response.data
            }
        },
    },
})



