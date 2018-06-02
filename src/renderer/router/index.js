import Vue from 'vue'
import Router from 'vue-router'
import iii from '../pages/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: iii
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
