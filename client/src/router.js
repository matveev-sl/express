// src/router.js

import { createRouter, createWebHistory } from 'vue-router'
import CreateTweet from './views/CreateTweet.vue'
import ViewTweets from './views/ViewTweets.vue'

const routes = [
  {
    path: '/create',
    name: 'CreateTweet',
    component: CreateTweet
  },
  {
    path: '/view',
    name: 'ViewTweets',
    component: ViewTweets
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
