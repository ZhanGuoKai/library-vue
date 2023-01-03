import request from '@/utils/request';

/**
 * @template T @typedef {import('@/utils/request').Response<T>} Response<T>
 */
/**
 * @typedef Borrower 借阅者
 * @property {string} username 用户名
 * @property {string} password 密码
 * @property {string} email 邮箱
 * @property {string|number|Date} borrowTime 借阅时间
 * @property {string|number|Date} returnTime 归还时间
 *
 * @typedef BorrowInfo 借阅信息
 * @property {import('./book').BookInfo} book 图书信息
 * @property {Borrower[]} borrowers 借阅者信息
 */

const url = '/admin';

export default {
  /**
   * 获取借阅信息
   *
   * @param {string} isbn 国际标准书号
   * @returns {Promise<Response<BorrowInfo>>}
   */
  getBorrowers(isbn) {
    return request.get(`${url}/borrowers`, { params: { isbn } });
  },

  /**
   * 录入图书
   *
   * @param {string} isbn 国际标准书号
   * @param {number} num 录入数量
   * @returns {Promise<Response<{}>>}
   */
  enterBook(isbn, num) {
    return request.post(`${url}/enter-book`, { isbn, num });
  }
};
