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
      config.headers.Authorization = token;
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
      throw new Error(res.msg);
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
