import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index.vue'
import contact from '../pages/contact.vue'
import dataK from '../pages/data-k.vue'
import dataSearch from '../pages/data-search.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact
    },
    {
      path: '/data-k',
      name: 'data-k',
      component: dataK
    },
    {
      path: '/data-search',
      name: 'data-search',
      component: dataSearch
    }
  ]
})
