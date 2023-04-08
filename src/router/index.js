import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import CardDetails from '../views/CardDetails.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/About',
        name: 'About',
        component: About
    },
    {
        path: '/Card/:id',
        name: 'CardDetails',
        component: CardDetails,
        props: true
    },
    // 404
    {
        path: '/:catchALL(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;