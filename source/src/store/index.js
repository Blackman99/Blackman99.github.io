import Vue from 'vue'
import Vuex from 'vuex'

import mouseAnimation from './mouseAnimation'
import login from './login'
import modal from './modal'
import bus from './bus'
import blog from './blog'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      login,
      mouseAnimation,
      modal,
      bus,
      blog
    }
  })
  return Store
}
