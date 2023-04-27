import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import CardDetails from '../views/CardDetails.vue'
import NotFound from '../views/NotFound.vue'

// const routes = [
//     {
//         path: '/projets/tfe/bast/',
//         name: 'Home',
//         component: Home
//     },
//     {
//         path: '/projets/tfe/bast//About',
//         name: 'About',
//         component: About
//     },
//     {
//         path: '/projets/tfe/bast//Card/:id',
//         name: 'CardDetails',
//         component: CardDetails,
//         props: true
//     },
//     // 404
//     {
//         path: '/projets/tfe/bast//:catchALL(.)',
//         name: 'NotFound',
//         component: NotFound
//     }
// ]
//
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
        path: '/Card/:id',
        name: 'CardDetails',
        component: CardDetails,
        props: true
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
// const router = createRouter({
//     history: createWebHistory(),
//     routes
// })




export default router;