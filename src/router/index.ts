/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory} from 'vue-router/auto'
import Dashboard from "@/pages/dashboard.vue";
import Doctors from "@/pages/doctors.vue";
import Nurses from "@/pages/nurses.vue";

const routes = [
  {
    path: '/',
    component: Dashboard,
    children: [
      {path: '/doctors', component: Doctors},
      {path: '/doctors', component: Doctors},
      {path: '/nurses', component: Nurses},
    ],
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
