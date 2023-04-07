import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Card from '../views/CardDetails.vue'

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
        path: '/Card',
        name: 'Card',
        component: Card
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;