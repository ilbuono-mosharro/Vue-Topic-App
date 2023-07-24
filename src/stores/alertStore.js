import {defineStore} from "pinia";

export const useAlertStore = defineStore('alert', {
    state: () => ({
        show:false,
        message:'',
    }),
    actions: {
        addAlert(msg) {
            this.show = true
            this.message = msg
        }
    }

})