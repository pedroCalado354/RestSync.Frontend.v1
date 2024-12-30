import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import registerView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
// import ScheduleView from '@/views/ScheduleView.vue'
import EmployeeView from '@/views/EmployeeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/Login',
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    // {
    //   path: '/schedule',
    //   name: 'schedule',
    //   component: ScheduleView,
    // },
    {
      path: '/employee',
      name: 'employee',
      component: EmployeeView,
    },
    {
      path: '/register',
      name: 'register',
      component: registerView,
    },
    {
      path: '/Login',
      name: 'Login',
      component: LoginView,
    },
  ],
})

export default router
