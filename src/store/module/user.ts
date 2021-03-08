import { IuserInfo, IloginParams } from '@/store/login-interface'
import { login } from '@/api/login'
import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    userInfo: {}
  },
  mutations: {
    SET_INFO (state: any, info: IuserInfo) {
      state.userInfo = info
    }
  },
  actions: {
    loginAction (params: any) {
      return new Promise((resolve, reject) => {
        login(params).then(res => {
          console.log('成功')
          resolve(res)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },
    logoutAction (params: any) {
      return new Promise((resolve, reject) => {
        try {
          Vue.ls.remove('token')
          sessionStorage.clear()
          resolve()
        } catch (err) {
          reject()
        }
      })
    }
  }
}
