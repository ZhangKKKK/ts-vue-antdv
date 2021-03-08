import { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Layout from '@/layout/BasicLayout.vue'
import UserLayout from '@/layout/UserLayout.vue'
export const dynamicRoutes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/home',
    meta: { title: '首页', icon: 'home', roles: ['admin', 'sale'], hidden: false }
  },
  {
    path: '/app',
    name: 'App',
    meta: { title: '总站', icon: 'home', roles: ['admin', 'sale'], hidden: false },
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: '主页', roles: ['admin', 'sale'], hidden: false },
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        meta: { title: '关于', roles: ['admin'], hidden: false },
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      },
    ]
  },
  {
    path: '/chart',
    name: 'chart',
    meta: { title: '图表', icon: 'dashboard', roles: ['admin', 'sale'], hidden: false },
    component: Layout,
    redirect: '/chart/a',
    children: [
      {
        path: '/chart/a',
        name: 'chartA',
        meta: { title: 'chartA', roles: ['admin', 'sale'], hidden: false },
        component: () => import(/* webpackChunkName: "about" */ '../views/chart/chart-a.vue'),
      },
      {
        path: '/chart/b',
        name: 'chartB',
        meta: { title: 'chartB', roles: ['sale'], hidden: false },
        component: () => import(/* webpackChunkName: "about" */ '../views/chart/chart-b.vue'),
      },
    ]
  },
  {
    path: '/404',
    name: 'notFound',
    meta: { title: '404' },
    component: () => import(/* webpackChunkName: "notFound" */ '../views/notFound.vue')
  }
];

export const basicRoutes = [
  {
    path: '/user',
    name: 'User',
    redirect: '/user/login',
    component: UserLayout,
    meta: { title: '用户', icon: '' },
    children: [
      {
        path: 'login',
        name: 'Login',
        meta: { title: '登录' },
        component: () => import(/* webpackChunkName: "login" */ '../views/user/Login.vue')
      },
      {
        path: 'sign',
        name: 'sign',
        meta: { title: '注册' },
        component: () => import(/* webpackChunkName: "sign" */ '../views/user/sign.vue')
      }
    ]
  }
]

export default {
  basicRoutes,
  dynamicRoutes
}
