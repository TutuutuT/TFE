import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import CardDetails from '../views/CardDetails.vue'
import NotFound from '../views/NotFound.vue'
import FreePrompt from '../views/FreePrompt.vue'
import Tuto from '../views/Tuto.vue'

const router = createRouter({
    routes:[{
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
        path: '/Card-:id',
        name: 'CardDetails',
        component: CardDetails,
        props: true
    },
    {
        path: '/TonPrompt',
        name: 'FreePrompt',
        component: FreePrompt,
    },
    {
        path: '/Tuto',
        name: 'Tuto',
        component: Tuto,
    },
    // 404
    {
        path: '/:catchALL(.)',
        name: 'NotFound',
        component: NotFound
    }],
    history: createWebHashHistory(),
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
      },
})


export default router;