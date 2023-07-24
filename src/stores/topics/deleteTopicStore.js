import {defineStore} from 'pinia'
import axios from "axios";
import {useAuthStore} from "../authStore.js";

export const useDeleteTopicsStore = defineStore('deleteTopicStore', {
    state: () => (
        {
            data: null,
            loading: false,
            error: null,
        }
    ),
    actions: {
        async delete(id) {
            const auth = useAuthStore()
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/api/topics/${id}/`,
                    {
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



