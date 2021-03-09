import { IuserInfo, IloginParams } from '@/store/login-interface'
import { login } from '@/api/login'
import Vue from 'vue'
import { VuexModule, Mutation, Action, getModule, Module } from 'vuex-module-decorators'
export interface IUserState {
  userInfo: any
}
import store from '@/store/index'
@Module({ namespaced: true, dynamic: true, name: 'user', store })
class User extends VuexModule implements IUserState {
  public userInfo = {}

  @Mutation
  public SET_INFO (info: IuserInfo) {
    this.userInfo = info
  }

  @Action
  public loginAction (params: any) {
    return new Promise((resolve, reject) => {
      login(params).then(res => {
        console.log('成功')
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }
  @Action
  public logoutAction (params: any) {
    return new Promise((resolve, reject) => {
      try {
        Vue.ls.remove('token')
        sessionStorage.clear()
        resolve(true)
      } catch (err) {
        reject()
      }
    })
  }
}
export const UserModule = getModule(User)
// export default {
//   namespaced: true,
//   state: {
//     userInfo: {}
//   },
//   mutations: {
//     SET_INFO (state: any, info: IuserInfo) {
//       state.userInfo = info
//     }
//   },
//   actions: {
//     loginAction (params: any) {
//       return new Promise((resolve, reject) => {
//         login(params).then(res => {
//           console.log('成功')
//           resolve(res)
//         }).catch(err => {
//           console.log(err)
//           reject(err)
//         })
//       })
//     },
//     logoutAction (params: any) {
//       return new Promise((resolve, reject) => {
//         try {
//           Vue.ls.remove('token')
//           sessionStorage.clear()
//           resolve(true)
//         } catch (err) {
//           reject()
//         }
//       })
//     }
//   }
// }
