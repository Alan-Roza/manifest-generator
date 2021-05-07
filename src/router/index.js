import Vue from 'vue'
import VueRouter from 'vue-router'
import FormManifest from '@/views/FormManifest.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manifest',
    component: FormManifest
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
