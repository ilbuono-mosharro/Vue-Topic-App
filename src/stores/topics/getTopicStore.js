import {defineStore} from 'pinia'
import axios from "axios";

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
                this.likes = this.data.upvote
                this.dislike = this.data.downvote
            } catch (e) {
                this.error = e.response.data
            } finally {
                this.loading = false
            }
        },
        async upVote(id, token) {
            try {
                const response = await axios.put(
                    `http://127.0.0.1:8000/api/topics/${id}/user-upvote/`, {},
                    {
                        headers: {
                            "Authorization": token,
                        },
                    })
                const data = response.data
                this.likes = data.upvote
                this.dislike = data.downvote
            } catch (e) {
                this.error = e.message
            }
        },
        async downVote(id, token) {
            try {
                const response = await axios.put(
                    `http://127.0.0.1:8000/api/topics/${id}/user-downvote/`, {},
                    {
                        headers: {
                            "Authorization": token,
                        },
                    })
                const data = response.data
                this.likes = data.upvote
                this.dislike = data.downvote
            } catch (e) {
                this.error = e.message
            }
        },
    },
})



