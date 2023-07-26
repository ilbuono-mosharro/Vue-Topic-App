import {defineStore} from "pinia";
import axios from "axios";

export const useSignUpStore = defineStore('signUp', {
    state: () => ({
        data: null,
        error: null,
        loading: false,
    }),
    actions: {
        async signUp(payload) {
            this.loading = true;
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