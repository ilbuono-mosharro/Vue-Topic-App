import {defineStore} from 'pinia'
import axios from "axios";

export const useCategoryStore = defineStore('category', {
    state: () => (
        {
            data: null,
            error: null,
            loading: true,
        }
    ),
    actions: {
        async fetchCategories() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/categories/`)
                this.data = response.data
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
    },
})



