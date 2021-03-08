import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { basicRoutes } from './routes'


Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0, x: 0 }),
  routes: basicRoutes,
});

export default router;
