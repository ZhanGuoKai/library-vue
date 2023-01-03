import request from '@/utils/request';

/**
 * @template T @typedef {import('@/utils/request').Response<T>} Response<T>
 */
/**
 * @typedef {import('./book').BookInfo} BookInfo 图书信息
 *
 * @typedef Record 借阅记录
 * @property {string|number|Date} borrowedTime 借阅时间
 * @property {string|number|Date?} returnedTime 归还时间
 * @property {BookInfo} book 图书信息
 */

const url = '/user';

export default {
  /**
   * 借书
   *
   * @param {string} isbn 国际标准书号
   * @returns {Promise<Response<{}>>}
   */
  borrow(isbn) {
    return request.post(`${url}/borrow`, { isbn });
  },

  /**
   * 还书
   *
   * @param {string} isbn 国际标准书号
   * @returns {Promise<Response<{}>>}
   */
  returnBook(isbn) {
    return request.post(`${url}/return`, { isbn });
  },

  /**
   * 获取借阅记录
   *
   * @param {number} limit 搜索限制的数量
   * @param {number} page 搜索的页数
   * @returns {Promise<Response<{total:number,records:Record[]>>}
   */
  getHistory(limit, page) {
    const offset = (page - 1) * limit;
    return request.get(`${url}/history`, { params: { limit, offset } });
  },

  /**
   * 获取推荐图书
   * @returns {Promise<Response<BookInfo[]>>}
   */
  getRecommended() {
    return request.get(`${url}/recommended`);
  }
};
