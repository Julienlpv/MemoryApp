import { createRouter, createWebHistory } from 'vue-router'
import QuizPage from '../views/QuizPageView.vue';
import Home from '../Home.vue';
import AddQuestion from '../views/AddQuestionView.vue';
import AddCategory from '../views/AddCategoryView.vue';
import CreateTheme from '../views/CreateThemeView.vue';

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
      component: (QuizPage)
    },
    {
      path: '/add-question',
      name: 'add-question',
      component: (AddQuestion)
    },
    {
      path: '/add-category',
      name: 'add-category',
      component: (AddCategory)
    },
    {
      path: '/create-theme',
      name: 'create-theme',
      component: (CreateTheme)
    }
  ]
})

export default router
