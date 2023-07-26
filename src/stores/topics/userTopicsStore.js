import {defineStore} from 'pinia'
import axios from "axios";

export const useUserTopicsStore = defineStore('userTopics', {
    state: () => (
        {
            data: null,
            loading: false,
            error: null,
        }
    ),
    actions: {
        async userTopics(token) {
            this.loading = true
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/topics/user-topics/`,
                    {
                        headers: {
                            "Authorization": token,
                        },
                    })
                this.data = response.data
                console.log(this.data)
            } catch (e) {
                this.error = e.response.data
            } finally {
                this.loading = false;
            }
        },
    },
})



