import { RouteConfig } from 'vue-router'
import { dynamicRoutes, basicRoutes } from '@/router/routes'
import router from '@/router'

const hasPermission = (roles: string[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
};

export const filterAsyncRoutes = (routes: RouteConfig[], roles: string[]) => {
  const res: RouteConfig[] = [];
  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });
  return res;
}

import { Module, Mutation, Action, VuexModule, getModule } from 'vuex-module-decorators'
import store from '@/store/index'

export interface IPeimessionState {
  routes: RouteConfig[]
}
@Module({ namespaced: true, dynamic: true, name: 'peimission', store })
class Peimession extends VuexModule implements IPeimessionState {
  public routes: RouteConfig[] = []

  @Mutation
  public SET_ROUTES (routes: any[]) {
    this.routes = basicRoutes.concat(routes)
  }

  @Action
  public GenerateRoutes (roles: string[] ) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(dynamicRoutes, roles);
      console.log(accessedRoutes)
      this.SET_ROUTES(accessedRoutes)
      router.addRoutes(accessedRoutes.concat({ path: '*', redirect: '/404' }))
      resolve(accessedRoutes);
    })
  }
}

export const PeimessionMoudle = getModule(Peimession)

// export default {
//   state: {
//     routes: []
//   },
//   mutations: {
//     SET_ROUTES (state: any, routes: any[]) {
//       state.routes = basicRoutes.concat(routes)
//     }
//   },
//   actions: {
//     GenerateRoutes (context: any, roles: string[] ) {
//       return new Promise(resolve => {
//         const accessedRoutes = filterAsyncRoutes(dynamicRoutes, roles);
//         console.log(accessedRoutes)
//         context.commit('SET_ROUTES', accessedRoutes)
//         router.addRoutes(accessedRoutes.concat({ path: '*', redirect: '/404' }))
//         resolve(accessedRoutes);
//       })
//     }
//   }
// }
