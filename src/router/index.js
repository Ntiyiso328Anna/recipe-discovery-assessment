import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipeView from '../views/RecipeView.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/recipes/:id', name: 'recipe', component: RecipeView, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})
