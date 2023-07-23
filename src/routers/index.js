import {createRouter, createWebHistory} from "vue-router";
import TheHome from "../views/TheHome.vue";

const routes = [
    {path: "/", component: TheHome, name: "home"},
    {path: "/login", component: () => import("../views/auth/TheLogin.vue"), name: "login"},
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export default router