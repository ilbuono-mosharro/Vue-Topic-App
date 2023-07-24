import {defineStore} from 'pinia'
import axios from "axios";

const base_url = "http://127.0.0.1:8000/api"


export const useTopicsStore = defineStore('topics', {
    state: () => (
        {
            data: null,
            loading: false,
            error: null,
            topic: null,
            added:null,
            deleted:null,
            updated:null,
        }
    ),
    actions: {
        async fetchTopics() {
            try {
                this.loading = true
                const response = await axios.get(`${base_url}/topics/`)
                this.data = response.data
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
        async getTopic(id) {
            try {
                this.loading = true
                const response = await axios.get(`${base_url}/topics/${id}/`)
                this.topic = response.data
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
        async addTopic(payload, token) {
            try {
                this.loading = true;
                const response = await axios.post(`${base_url}/topics/`, payload, {
                    headers: {
                        "Authorization": token,
                    },
                })
                this.added = response.data
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false;
            }
        },
        async deleteTopic(id, token) {
            try {
                const response = await axios.delete(`${base_url}/topics/${id}/`, {
                    headers: {
                        "Authorization": token,
                    },
                })
                this.deleted = response.data
            } catch (e) {
                this.error = e.message
            }
        },
        async updateTopic(id, payload, token) {
            try {
                this.loading = true;
                const response = await axios.put(`${base_url}/topics/${id}/`, payload, {
                    headers: {
                        "Authorization": token,
                    },
                })
                this.updated = response.data
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false;
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



