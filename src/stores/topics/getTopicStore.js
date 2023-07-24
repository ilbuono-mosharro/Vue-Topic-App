import {defineStore} from 'pinia'
import axios from "axios";


export const useGetTopicStore = defineStore('getTopicStore', {
    state: () => (
        {
            data: null,
            loading: true,
            error: null,
        }
    ),
    actions: {
        async get(id) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/topics/${id}/`)
                this.data = response.data
            } catch (e) {
                this.error = e.response.data
            } finally {
                this.loading = false
            }
        },
    },
})



