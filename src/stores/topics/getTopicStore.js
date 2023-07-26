import {defineStore} from 'pinia'
import axios from "axios";
import {useAuthStore} from "../authStore.js";

export const useGetTopicStore = defineStore('getTopicStore', {
    state: () => (
        {
            data: null,
            likes: null,
            dislike: null,
            loading: true,
            error: null,
        }
    ),
    actions: {
        async get(id) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/topics/${id}/`)
                this.data = response.data
                this.likes = this.data.upvote_count
                this.dislike = this.data.downvote_count
            } catch (e) {
                this.error = e.response.data
            } finally {
                this.loading = false
            }
        },
        async upVote(id) {
            const auth = useAuthStore()
            try {
                const response = await axios.put(
                    `http://127.0.0.1:8000/api/topics/${id}/user-upvote/`, {},
                    {
                        headers: {
                            "Authorization": `Token ${auth.token}`,
                        },
                    })
                this.data = response.data
                this.likes = this.data.upvote_count
                this.dislike = this.data.downvote_count
            } catch (e) {
                this.error = e.message
            }
        },
        async downVote(id) {
            try {
                const auth = useAuthStore()
                const response = await axios.put(
                    `http://127.0.0.1:8000/api/topics/${id}/user-downvote/`, {},
                    {
                        headers: {
                            "Authorization": `Token ${auth.token}`,
                        },
                    })
                this.data = response.data
                this.likes = this.data.upvote_count
                this.dislike = this.data.downvote_count
            } catch (e) {
                this.error = e.message
            }
        },
    },
})



