import { createRouter, createWebHistory } from 'vue-router'
import QuizPage from '../components/QuizPage.vue';
import Home from '../Home.vue';
import AddQuestion from '../components/AddQuestion.vue';
import AddCategory from '../views/AddCategory.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: (Home)
    },
    {
      path: '/quiz',
      name: 'quiz',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: (QuizPage)
    },
    {
      path: '/addquestion',
      name: 'addquestion',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: (AddQuestion)
    },
    {
      path: '/addcategory',
      name: 'addcategory',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: (AddCategory)
    }
  ]
})

export default router
