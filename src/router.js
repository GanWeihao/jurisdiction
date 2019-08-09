import Vue from 'vue'
import Router from 'vue-router'
import Home from "./views/Home";
import Index from "@/views/Index";
import About from "@/components/about"

Vue.use(Router)

export default new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/index',
            name: 'index',
            component: Index
        },
        {
            path: '/about',
            name: 'about',
            component: About
        }
    ]
})
