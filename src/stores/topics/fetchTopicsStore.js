import {defineStore} from 'pinia'
import axios from "axios";


export const useTopicsStore = defineStore('fetchTopicsStore', {
    state: () => (
        {
            data: null,
            loading: true,
            error: null,

        }
    ),
    actions: {
        async fetchTopics(url) {
            this.loading = true
            try {
                const response = await axios.get(url)
                this.data = response.data
            } catch (error) {
                this.error = error.response.data
            } finally {
                this.loading = false
            }
        },
    },
    getters: {
        total: (state) => state?.data ? state.data.length : 0,
    },
})



