import {createRouter, createWebHistory} from "vue-router";
import TheHome from "../views/TheHome.vue";
import {useAuthStore} from "../stores/authStore.js";

const routes = [
    {
        path: "/", component: TheHome, name: "home"
    },
    {
        path: "/topic/:id", component: () => import("../views/topics/TheTopic.vue"), name: "topic"
    },
    {
        path: "/topic/add", component: () => import("../views/topics/TheAddTopic.vue"), name: "addTopic",
        meta: {requiresAuth: true}
    },
    {
        path: "/topic/update/:id", component: () => import("../views/topics/TheUpdateTopic.vue"),
        name: "updateTopic", meta: {requiresAuth: true},
    },
    {
        path: "/my-topics", component: () => import("../views/topics/TheUserTopic.vue"), name: "userTopics",
        meta: {requiresAuth: true}
    },
    {
        path: "/sign-up", component: () => import("../views/registration/TheSignUp.vue"), name: "signup"
    },
    {
        path: '/profile', component: () => import("../views/accounts/TheProfile.vue"), name: "profile",
        meta: {requiresAuth: true}
    },
    {
        path: '/deleted', component: () => import("../views/messages/TheDelete.vue"),
        name: "deleted", meta: {requiresAuth: true},
    },
    {
        path: "/sign-up/message", component: () => import("../views/messages/TheInfo.vue"),
        name: "info"
    },
    {
        path: "/login", component: () => import("../views/auth/TheLogin.vue"), name: "login"
    },
    {
        path: "/logout", component: () => import("../views/auth/TheLogout.vue"), name: "logout",
    },
    {
        path: "/:pathMatch(.*)*", component: () => import("../components/TheNotFound.vue"), name: "notFound",
    },
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
        return {name: 'login', query: {redirect: to.fullPath}}
    }
})

export default router