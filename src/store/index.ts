import Vue from 'vue';
import Vuex from 'vuex';
import { IUserState } from './module/user'
import { IPeimessionState } from './module/peimission'
import createPersistedState from 'vuex-persistedstate'
import { ITodoState } from './module/todo'

Vue.use(Vuex);

interface IRootState {
  user: IUserState,
  peimession: IPeimessionState,
  todo: ITodoState
}

export default new Vuex.Store<IRootState>({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
});
