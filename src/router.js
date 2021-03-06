import Vue from 'vue'
import Router from 'vue-router'
import profile from './views/profile.vue'
import contact from './views/contact.vue'
import home from './views/home.vue'
import hotspot from './views/hotspot.vue'
import rewards from './views/rewards.vue'
import commission from './views/commission.vue'
import login from './views/login.vue'
import register from './views/register.vue'
import help from './views/help.vue'
import dashboard from './views/dashboard.vue'
import DashboardLayout from './layout/dashboardLayout'
import AuthLayout from './layout/authLayout'
import forgot from './views/forgot'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: 'home',
            component: DashboardLayout,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: home
                },
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: dashboard
                },
                {
                    path: '/account',
                    name: 'account',
                    component: profile,
                },
                {
                    path: '/contact',
                    name: 'contact',
                    component: contact
                },
                {
                    path: '/hotspot',
                    name: 'hotspot',
                    component: hotspot
                },
                {
                    path: '/rewards',
                    name: 'rewards',
                    component: rewards
                },
                {
                    path: '/commissions',
                    name: 'commission',
                    component: commission
                },
                 {
                    path: '/help',
                    name: 'help',
                    component: help
                },

            ]
        },
        {
            path: '/',
            redirect: 'login',
            component: AuthLayout,
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: login
                },
                {
                    path: '/register',
                    name: 'register',
                    component: register
                },
                {
                    path: '/forgot',
                    name: 'forgot',
                    component: forgot
                },

            ]
        }]
})