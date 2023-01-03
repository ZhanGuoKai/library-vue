import store from '@/store';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/auth')
  }
];

const modulesFiles = require.context('./modules', false, /\.js$/);
modulesFiles
  .keys()
  .forEach(modulePath => routes.push(modulesFiles(modulePath).default));

const router = new Router({
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.name) {
    if (to.name === 'login') {
      if (store.state.user.token) {
        if (store.state.user.username === '') {
          await store.dispatch('GetInfo');
        }
        if (store.state.user.role === 1) next('/admin');
        else if (store.state.user.role === 0) next('/user');
      }
    } else {
      if (store.state.user.username === '') {
        await store.dispatch('GetInfo');
      }
      if (to.name.startsWith('admin') && store.state.user.role !== 1) {
        next('/user');
      }
    }
    next();
  } else next();
});

export default router;
