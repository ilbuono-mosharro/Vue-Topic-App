import {defineStore} from 'pinia'
import {useAuthStore} from "../authStore.js";
import axios from "axios";

const base_url = "http://127.0.0.1:8000/api"


export const useUpdateTopicsStore = defineStore('updateTopicStore', {
    state: () => (
        {
            data: null,
            loading: false,
            error: null,
        }
    ),
    actions: {
        async update(id, payload, token) {
            const auth = useAuthStore()
            try {
                this.loading = true;
                const response = await axios.put(`${base_url}/topics/${id}/`, payload, {
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



