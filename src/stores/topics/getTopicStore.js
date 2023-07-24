import {defineStore} from 'pinia'
import axios from "axios";

const base_url = "http://127.0.0.1:8000/api"


export const useGetTopicStore = defineStore('getTopicStore', {
    state: () => (
        {
            data: null,
            loading: false,
            error: null,
        }
    ),
    actions: {
        async get(id) {
            this.loading = true
            try {
                const response = await axios.get(`${base_url}/topics/${id}/`)
                this.data = response.data
            } catch (e) {
                this.error = e.response.data
            } finally {
                this.loading = false
            }
        },
    },
})



