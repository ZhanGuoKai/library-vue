// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import './filters'; // 导入全局过滤器
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

// 全局挂载axios
Vue.prototype.$http = axios;

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
