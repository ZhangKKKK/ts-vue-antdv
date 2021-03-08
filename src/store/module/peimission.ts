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

export default {
  state: {
    routes: []
  },
  mutations: {
    SET_ROUTES (state: any, routes: any[]) {
      state.routes = basicRoutes.concat(routes)
    }
  },
  actions: {
    GenerateRoutes (context: any, roles: string[] ) {
      return new Promise(resolve => {
        const accessedRoutes = filterAsyncRoutes(dynamicRoutes, roles);
        console.log(accessedRoutes)
        context.commit('SET_ROUTES', accessedRoutes)
        router.addRoutes(accessedRoutes.concat({ path: '*', redirect: '/404' }))
        resolve(accessedRoutes);
      })
    }
  }
}
