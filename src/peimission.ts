import Vue from 'vue'
import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { Route, RouteConfig } from 'vue-router';

NProgress.configure({ showSpinner: false });

const whiteList = ['/user/login', '/user/sign'];

router.beforeEach(async (to: Route, _: Route, next: any) => {
  // Set document Title
  setDocumentTitle(`${to.meta.title} - ${domTitle}`)
  // Start progress bar
  NProgress.start();

  // Determine whether the user has logged in
  if (Vue.ls.get('token')) {
    if (whiteList.includes(to.path)) {
      // If is logged in, redirect to the home page
      next({ path: '/' });
      NProgress.done();
    } else {
      next()
    }
  } else {
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next();
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/user/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done();

  // set page title
  // document.title = `to.meta.title`;
});
