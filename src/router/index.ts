/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory} from 'vue-router/auto'


const router = createRouter({
  history: createWebHistory(),

})

export default router
