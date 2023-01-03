import request from '@/utils/request';

/**
 * @template T @typedef {import('@/utils/request').Response<T>} Response<T>
 */
/**
 * @typedef RegisterInfo 注册信息
 * @property {string} username 用户名
 * @property {string} password 密码
 * @property {string} email 邮箱
 * @property {string} code 验证码
 *
 * @typedef LoginInfo 登录信息
 * @property {string} username 用户名
 * @property {string=} password 密码
 * @property {string=} email 邮箱
 * @property {string} code 验证码
 *
 * @typedef ResponseInfo 响应信息
 * @property {string} token 令牌
 * @property {string} username 用户名
 * @property {string=} email 邮箱
 * @property {number} role 身份
 */

const url = '/auth';

export default {
  /**
   * 获取邮箱验证码
   *
   * @param {string} email 邮箱地址
   * @returns {Promise<Response<{}>>}
   */
  getVerificationCode(email) {
    return request.post(`${url}/send-code`, { email });
  },

  /**
   * 注册并登录
   *
   * @param {RegisterInfo} info 用户注册信息
   * @returns {Promise<Response<ResponseInfo>>}
   */
  register(info) {
    return request.post(`${url}/register`, info);
  },

  /**
   * 登录
   *
   * @param {LoginInfo} info 用户登录信息
   * @returns {Promise<Response<ResponseInfo>>}
   */
  login(info) {
    if (info.email) return request.post(`${url}/email-login`, info);
    return request.post(`${url}/password-login`, info);
  },

  /**
   * 登出
   * @returns {Promise<Response<{}>>}
   */
  logout() {
    return request.post('/user/logout');
  },

  /**
   * 获取用户信息
   * @returns {Promise<Response<{username:string,email:string,role:number}>>}
   */
  getInfo() {
    return request.get('/user/info');
  }
};
