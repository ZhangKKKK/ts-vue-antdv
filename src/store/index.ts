import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './module/user'
import peimission from './module/peimission'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    peimission,
    userModule
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
});
