import Vue from 'vue'
import Vuex from 'vuex'
import imageStorage from '@/store/modules/imageStorage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    imageStorage,
  }
})
