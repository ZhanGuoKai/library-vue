import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login')
  }
];

const modulesFiles = require.context('./modules', false, /\.js$/);
modulesFiles
  .keys()
  .forEach(modulePath => routes.push(modulesFiles(modulePath).default));

export default new Router({
  routes
});
