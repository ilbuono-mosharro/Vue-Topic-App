import {createRouter, createWebHistory} from "vue-router";
import TheHome from "../views/TheHome.vue";
import {useAuthStore} from "../stores/authStore.js";

const routes = [
    {path: "/", component: TheHome, name: "home", meta: { requiresAuth: true }},
    {path: "/login", component: () => import("../views/auth/TheLogin.vue"), name: "login"},
    {path: "/logout", component: () => import("../views/auth/TheLogout.vue"), name: "logout"},
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to) => {
    // ✅ This will work because the router starts its navigation after
    // the router is installed and pinia will be installed too
    const user = useAuthStore()
    if (to.meta.requiresAuth && !user.isAuthenticated) {
        return {name:'login', query:{ redirect: to.fullPath }}
    }
})

export default router