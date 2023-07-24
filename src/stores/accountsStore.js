import {defineStore} from 'pinia'
import axios from "axios";
import {useAuthStore} from "./authStore.js";

export const useAccountsStore = defineStore('accounts', {
    state: () => ({
        data: null,
        error: null,
        loading: true,
        done: null,
        errors: null,
    }),
    actions: {
        async profile() {
            const auth = useAuthStore()
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/accounts/profile/",
                    {
                        headers: {
                            "Authorization": `Token ${auth.token}`,
                        },
                    })
                this.data = response.data
            } catch (e) {
                this.error = e.response.data
            } finally {
                this.loading = false
            }
        },
        async delete() {
            const auth = useAuthStore()
            try {
                const response = await axios.delete("http://127.0.0.1:8000/api/accounts/profile/",
                    {
                        headers: {
                            "Authorization": `Token ${auth.token}`,
                        },
                    })
                this.done = response.data
            } catch (e) {
                this.errors = e.response.data
            }
        },
    },
})