import request from '@/utils/request';

/**
 * @template T @typedef {import('@/utils/request').Response<T>} Response
 */
/**
 * @typedef Info 用户信息
 * @property {string} username 用户名
 * @property {string} password 密码
 */

const url = '/auth';

export default {
  /**
   * 注册并登录
   *
   * @param {Info} userInfo 用户注册信息
   * @returns {Promise<Response<{token:string,role:number}>>}
   */
  register(userInfo) {
    return request.post(`${url}/register`, userInfo);
  },

  /**
   * 登录
   *
   * @param {Info} userInfo 用户登录信息
   * @returns {Promise<Response<{token:string,role:number}>>}
   */
  login(userInfo) {
    return request.post(`${url}/login`, userInfo);
  },

  /**
   * 登出
   *
   * @returns {Promise<Response<{}>>}
   */
  logout() {
    return request.post('user/logout');
  }
};
