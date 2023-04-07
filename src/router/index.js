import { createRouter, createWebHistory } from "vue-router";
import Cards from '../components/Card.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/',
        name: 'About',
        component: About
    },
    {
        path: '/Cards/:id',
        name: 'Cards',
        component: Cards
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;