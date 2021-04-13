import Vue from 'vue'
import Router from 'vue-router'
import profile from './components/profile.vue'
import contact from './components/contact.vue'
import home from './views/home.vue'
import hotspot from './components/hotspot.vue'
import rewards from './components/rewards.vue'
import test from './components/test.vue'
import login from './components/login.vue'
import register from './components/register.vue'
import dashboard from './views/dashboard.vue'
import DashboardLayout from './layout/dashboardLayout'
import AuthLayout from './layout/authLayout'
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
                    props: (route) => ({query: route.query.uid})
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
                    path: '/test',
                    name: 'test',
                    component: test
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

            ]
        }]
})