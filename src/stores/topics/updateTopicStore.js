import {defineStore} from 'pinia'
import {useAuthStore} from "../authStore.js";
import axios from "axios";

export const useUpdateTopicsStore = defineStore('updateTopicStore', {
    state: () => (
        {
            data: null,
            loading: true,
            error: null,
        }
    ),
    actions: {
        async update(id, payload) {
            const auth = useAuthStore()
            try {
                const response = await axios.put(`http://127.0.0.1:8000/api/topics/${id}/`,payload,
                    {
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



