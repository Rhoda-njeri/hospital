/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory} from 'vue-router/auto'
import Dashboard from "@/pages/dashboard.vue";

const routes = [
  {
    path: '/',
    component: Dashboard,
    children: [],
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
