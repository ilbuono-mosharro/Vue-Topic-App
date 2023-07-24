import {defineStore} from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loading: true,
        error: null,
        token: JSON.parse(localStorage.getItem('token')) || null,
    }),
    actions: {
        async authentication(payload) {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/accounts/api-token-auth/", payload
                )
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
                await axios.post("http://127.0.0.1:8000/api/accounts/logout/", {}, {
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
            return state?.token !== null;
        },
    },
})