import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/learn/english',
      name: 'learn-english-lessons',
      component: () => import('./views/LearnType/English/Learn-English-Lessons.vue')
    },
    {
      path: '/learn/english/classic/:id',
      name: 'learn-english-typing',
      component: () => import('./views/LearnType/English/Learn-English-Typing.vue')
    },
    {
      path: '/typing-test/english',
      name: 'english-test-settings',
      component: () => import('./views/TypingTest/English/English-Test-Settings.vue')
    },
    {
      path: '/typing-test/english/:id',
      name: 'typing-test-english',
      component: () => import('./views/TypingTest/English/Typing-Test-English.vue')
    },
    {
      path: '/typing-test/hindi/inscript',
      name: 'hindi-inscript-test-settings',
      component: () => import('./views/TypingTest/Hindi-Inscript/Inscript-Hindi-Test-Settings.vue')
    },
    {
      path: '/typing-test/hindi/inscript/:passageType/:id',
      name: 'typing-test-inscript-hindi',
      component: () => import('./views/TypingTest/Hindi-Inscript/Typing-Test-Inscript-Hindi.vue')
    },
    {
      path: '/learn/hindi/inscript',
      name: 'inscript-hindi-lessons',
      component: () => import('./views/LearnType/Hindi-Inscript/Inscript-Hindi-Lessons.vue')
    },
    {
      path: '/learn/hindi/inscript/:id',
      name: 'learn-hindi-inscript-typing',
      component: () => import('./views/LearnType/Hindi-Inscript/Learn-Inscript-Hindi.vue')
    },
    {
      path: '/learn/hindi/krutidev',
      name: 'krutidev-hindi-lessons',
      component: () => import('./views/LearnType/Hindi-KrutiDev/KrutiDev-Hindi-Lessons.vue')
    },
    {
      path: '/learn/hindi/krutidev/:id',
      name: 'learn-hindi-krutidev-typing',
      component: () => import('./views/LearnType/Hindi-KrutiDev/Learn-KrutiDev-Hindi.vue')
    },
    {
      path: '/typing-test/hindi/krutidev',
      name: 'hindi-krutidev-test-settings',
      component: () => import('./views/TypingTest/Hindi-KrutiDev/KrutiDev-Hindi-Test-Settings.vue')
    },
    {
      path: '/typing-test/hindi/krutidev/:passageType/:id',
      name: 'typing-test-krutidev-hindi',
      component: () => import('./views/TypingTest/Hindi-KrutiDev/Typing-Test-KrutiDev-Hindi.vue')
    },
    // About
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
  ]
})
