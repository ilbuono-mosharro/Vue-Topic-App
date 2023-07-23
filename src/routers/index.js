import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {
        path: "/login", component: () => import("../views/auth/TheLogin.vue"), name: "login"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export default router