import {defineStore} from 'pinia'
import axios from 'axios'

const BaseUrl = "http://127.0.0.1:8000/api"

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loading: null,
        error: null,
        token: localStorage.getItem('token') || null,
    }),
    actions: {
        async login(payload) {
            this.loading = true
            try {
                const response = await axios.post(`${BaseUrl}/accounts/api-token-auth/`, payload)
                this.token = response.data
                localStorage.setItem('token', this.token.token);
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
    },
    getters: {
        isAuthenticated: (state) => {
            return state?.token !== null;
        },
    },
})