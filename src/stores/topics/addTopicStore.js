import {defineStore} from 'pinia'
import axios from "axios";
import {useAuthStore} from "../authStore.js";

const base_url = "http://127.0.0.1:8000/api"


export const useAddTopicStore = defineStore('addTopicStore', {
    state: () => (
        {
            data: null,
            loading: false,
            error: null,
        }
    ),
    actions: {
        async add(payload) {
            try {
                this.loading = true;
                const auth = useAuthStore()
                const response = await axios.post(`${base_url}/topics/`, payload, {
                    headers: {
                        "Authorization": `Token ${auth.token}`,
                    },
                })
                this.data = response.data
            } catch (e) {
                this.error = e.response.data
            } finally {
                this.loading = false;
            }
        },
    },
})



