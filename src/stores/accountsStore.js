import {defineStore} from 'pinia'
import axios from "axios";
import {useAuthStore} from "./authStore.js";
const base_url = "http://127.0.0.1:8000/api"
const auth = useAuthStore()

export const useAccountsStore = defineStore('accounts', {
    state: () => ({
        profile: null,
        error: null,
        loading: false,
        done: null,
        derror:null,
    }),
    actions: {
        async profile() {
            this.loading = true
            try {
                const response = await axios.get(`${base_url}/accounts/profile/`,
                    {
                        headers: {
                            "Authorization": `Token ${auth.token}`,
                        },
                    })
                this.profile = response.data
            } catch (e) {
                this.error = e.response.data
            } finally {
                this.loading = false
            }
        },
        async delete() {
            try {
                const response = await axios.delete(`${base_url}/accounts/profile/`,
                    {
                        headers: {
                            "Authorization": `Token ${auth.token}`,
                        },
                    })
                this.done = response.data
            } catch (e) {
                this.derror = e.response.data
            }
        },
    },
})