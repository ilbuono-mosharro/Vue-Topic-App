import {defineStore} from 'pinia'
import axios from "axios";


export const useTopicsStore = defineStore('fetchTopicsStore', {
    state: () => (
        {
            data: null,
            loading: true,
            error: null,
            originalData:null,

        }
    ),
    actions: {
        async fetchTopics() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/topics/")
                this.data = response.data
                this.originalData = response.data
            } catch (error) {
                this.error = error.response.data
            } finally {
                this.loading = false
            }
        },
        userTopic(user){
            this.data = this.data.filter(item => item.starter.username === user)
        },
        topics() {
            this.data = this.originalData
        }
    },
    getters: {
        total: (state) => state?.data ? state.data.length : 0,
    },
})



