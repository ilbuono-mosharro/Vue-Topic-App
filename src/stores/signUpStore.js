import {defineStore} from "pinia";
import axios from "axios";

export const useSignUpStore = defineStore('signUp', {
    state: () => ({
        data: null,
        error: null,
        loading: true,
    }),
    actions: {
        async signUp(payload) {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/accounts/sign-up/", payload
                )
                this.data = response.data
            } catch (error) {
                this.error = error.response.data
            } finally {
                this.loading = false;
            }
        },
    },
})