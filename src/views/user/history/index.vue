<template>
  <div>
    <span class="total">共找到 {{ total }} 本书</span>
    <book-table
      ref="table"
      :total="total"
      :books="books"
      @fetch-data="fetchData"
    >
      <el-table-column label="借阅时间" width="180px">
        <template slot-scope="{ row }">
          {{ row.borrowedTime | formatTime('yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="归还时间" width="180px">
        <template slot-scope="{ row }">
          <span v-if="row.returnedTime">
            {{ row.returnedTime | formatTime('yyyy-MM-dd hh:mm:ss') }}
          </span>
          <loading-button
            v-else
            size="mini"
            type="primary"
            @click="returnBook($event, row.code)"
          >
            归还
          </loading-button>
        </template>
      </el-table-column>
    </book-table>
  </div>
</template>

<script>
import BookTable from '@/components/book-table/index.vue';
import LoadingButton from '@/components/loading-button/index.vue';
import userApi from '@/api/user';

export default {
  name: 'UserHistory',

  components: { BookTable, LoadingButton },

  data() {
    return {
      /** 图书列表 */
      books: [],
      /** 总数 */
      total: 0
    };
  },

  mounted() {
    this.$refs.table.fetchData();
  },

  methods: {
    /**
     * 获取数据
     *
     * @param {number} page 当前页码
     * @param {number} limit 当前页码
     * @param {()=>void} done 获取数据结束的回调函数
     */
    async fetchData(page, limit, done) {
      try {
        const response = await userApi.getHistory(limit, page);
        if (response.success) {
          this.total = response.data.total;
          const records = response.data.records;
          this.books = records.map(record => ({
            borrowedTime: record.borrowedTime,
            returnedTime: record.returnedTime,
            ...record.book
          }));
        }
      } catch (error) {
        this.$message.error(error);
      }
      done();
    },

    /**
     * 归还图书
     * 
     * @param {()=>void} done 加载完成的回调函数
     * @param {string} isbn 国际标准书号
     */
    async returnBook(done, isbn) {
      try {
        const response = await userApi.returnBook(isbn);
        if (response.success) this.$message.success('归还成功');
        else this.$message.error(response.msg);
      } catch (error) {
        this.$message.error('归还失败');
      }
      done();
      this.$refs.table.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped></style>
