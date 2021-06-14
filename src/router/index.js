import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Details from '../views/Details.vue'
import ListUsers from "@/views/ListUsers";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list-users',
    name: 'ListUsers',
    component: ListUsers
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: Details
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
