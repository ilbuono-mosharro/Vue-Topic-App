import {defineStore} from "pinia";
import axios from "axios";

const base_url = "http://127.0.0.1:8000/api"
export const useSignUpStore = defineStore('signUp', {
    state: () => ({
        data: null,
        error: null,
        loading: false,
    }),
    actions: {
        async signUp(payload) {
            try {
                this.loading = true;
                const response = await axios.post(`${base_url}/accounts/sign-up/`, payload)
                this.data = response.data
            } catch (error) {
                this.error = error.response.data
            } finally {
                this.loading = false;
            }
        },
    },
})