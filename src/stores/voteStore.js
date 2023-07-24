import {defineStore} from 'pinia'
import axios from "axios";
import {useAuthStore} from "./authStore.js";

const base_url = "http://127.0.0.1:8000/api"
const auth = useAuthStore()

export const useVoteStore = defineStore('vote', {
    state: () => (
        {
            topic:null,
            upvoteNum: null,
            upError: null,
            downvoteNum: null,
            downError: null,
        }
    ),
    actions: {
        async upvote(id) {
            try {
                const response = await axios.post(`${base_url}/topics/${id}/user-upvote/`, {}, {
                    headers: {
                        "Authorization": `Token ${auth.token}`,
                    },
                })
                this.topic = response.data
                this.upvoteNum = this.topic.upvote_count
                this.downvoteNum = this.topicvote.downvote_count
            } catch (e) {
                this.upError = e.response.data
            }
        },
        async downvote(id) {
            try {
                const response = await axios.post(`${base_url}/topics/${id}/user-downvote/`, {}, {
                    headers: {
                        "Authorization": `Token ${auth.token}`,
                    },
                })
                this.topic = response.data
                this.downvoteNum = this.topic.downvote_count
                this.upvoteNum = this.topic.upvote_count
            } catch (e) {
                this.downError = e.response.data
            }
        },
    },
})



