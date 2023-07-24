import {defineStore} from 'pinia'
import axios from "axios";

const base_url = "http://127.0.0.1:8000/api"


export const useTopicsStore = defineStore('topics', {
    state: () => (
        {
            data: null,
            loading: false,
            error: null,
        }
    ),
    actions: {
        async fetchTopics() {
            try {
                this.loading = true
                const response = await axios.get(`${base_url}/topics/`)
                this.data = response.data
            } catch (error) {
                this.error = error.response.data
            } finally {
                this.loading = false
            }
        },
    },
    getters: {
        total: (state) => state.data ? state.data.length : 0,
        // mytopic: (state) => {
        //     return state.data.filter((topic, user) => topic?.starter?.username === user)
        // }
    },
})



