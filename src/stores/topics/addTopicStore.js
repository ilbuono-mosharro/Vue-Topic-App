import {defineStore} from 'pinia'
import axios from "axios";
import {useAuthStore} from "../authStore.js";


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
            const auth = useAuthStore()
            this.loading = true
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/topics/", payload,
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



