import axios from 'axios';
import store from '@/store';

/**
 * @template T 响应数据类型
 * @typedef Response<T> 响应对象
 * @property {number} code 响应码
 * @property {string} msg 响应信息
 * @property {boolean} success 是否成功
 * @property {T} data 响应数据
 */

const service = axios.create({
  baseURL: '/api',
  timeout: 20000
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = store.state.user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  async response => {
    const res = response.data;
    if (res.success) {
      return res;
    } else {
      throw res.msg;
    }
  },
  async error => {
    if (error.response.status === 401) {
      await store.dispatch('LocalLogout');
      throw '登录过期，请重新登录';
    }
    throw error;
  }
);

export default service;
