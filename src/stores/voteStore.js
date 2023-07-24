import {defineStore} from 'pinia'
import axios from "axios";
import {useAuthStore} from "./authStore.js";

const base_url = "http://127.0.0.1:8000/api"
const auth = useAuthStore()

export const useVoteStore = defineStore('vote', {
    state: () => (
        {
            topic:null,
            topicDown:null,
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
                this.downvoteNum = this.topic.downvote_count
            } catch (e) {
                this.upError = e.message
            }
        },
        async downvote(id) {
            try {
                const response = await axios.post(`${base_url}/topics/${id}/user-downvote/`, {}, {
                    headers: {
                        "Authorization": `Token ${auth.token}`,
                    },
                })
                this.topicDown = response.data
                this.downvoteNum = this.topicDown.downvote_count
                this.upvoteNum = this.topicDown.upvote_count
            } catch (e) {
                this.downError = e.message
            }
        },
    },
})



