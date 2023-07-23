import {defineStore} from 'pinia'
import axios from 'axios'

const BaseUrl = "http://127.0.0.1:8000/api"

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loading: null,
        error: null,
        token: JSON.parse(localStorage.getItem('token')) || null,
    }),
    actions: {
        async authentication(payload) {
            try {
                this.loading = true
                const response = await axios.post(`${BaseUrl}/accounts/api-token-auth/`, payload)
                this.token = response.data.token
                localStorage.setItem('token', JSON.stringify(this.token));
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
        async logOut() {
            try {
                await axios.post(`${BaseUrl}/accounts/logout/`, {}, {
                    headers: {
                        "Authorization": `Token ${this.token}`
                    }
                })
                this.token = null
                localStorage.removeItem('token')
            } catch (e) {
                this.error = e.message
            }
        },
    },
    getters: {
        isAuthenticated: (state) => {
            return state.token !== null;
        },
    },
})