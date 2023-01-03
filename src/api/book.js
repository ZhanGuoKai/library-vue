import request from '@/utils/request';

/**
 * @template T @typedef {import('@/utils/request').Response<T>} Response<T>
 */
/**
 * @typedef BookInfo 图书基本信息
 * @property {number} id 图书编码
 * @property {string} name 书名
 * @property {string} author 作者
 * @property {string} publishing 出版社
 * @property {string} translator 译者
 * @property {string} published 出版时间
 * @property {string} pages 页数
 * @property {string} code 国际标准书号
 * @property {string} price 价格
 * @property {string} description 图书简介
 * @property {string} authorIntro 作者简介
 * @property {string} photoUrl 图片封面地址
 * @property {number} num 图书数量
 * @property {boolean?} borrowing 是否正在借阅
 *
 * @typedef BookDetails 图书详细信息
 * @property {number} id 国际编码
 * @property {string} name 书名
 * @property {string} subname 副标题
 * @property {string} author 作者
 * @property {string?} translator 译者
 * @property {string} publishing 出版社
 * @property {string} published 出版时间
 * @property {string} designed 装帧
 * @property {string} code 国际标准书号
 * @property {number} douban 豆瓣的图书编号
 * @property {number} doubanScore 豆瓣评分 0到100分
 * @property {number} numScore 评价人数
 * @property {string?} brand 丛书
 * @property {string} pages 页数
 * @property {string} photoUrl 图片地址
 * @property {string} price 价格
 * @property {number} num 图书数量
 * @property {string} authorIntro 作者简介
 * @property {string} description 图书简介
 */

const url = '/book';

export default {
  /**
   * 搜索图书
   *
   * @param {string} key 搜索属性
   * @param {string} value 搜索的属性对应的值
   * @param {number} limit 搜索限制的数量
   * @param {number} page 搜索的页数
   * @returns {Promise<Response<{total:number,books:BookDetails[]}>>}
   */
  search(key, value, limit, page) {
    const offset = (page - 1) * limit;
    return request.get(`${url}/search`, {
      params: { key, value, limit, offset }
    });
  },

  /**
   * 获取图书详细信息
   *
   * @param {String} isbn 国际标准书号
   * @returns {Promise<Response<BookDetails>>}
   */
  details(isbn) {
    return request.get(`${url}/details`, { params: { isbn } });
  }
};
