<template>
  <div>
    <book-table class="table" :total="total" :books="books">
      <el-table-column label="操作" width="80px">
        <template slot-scope="{ row }">
          <div @click.stop>
            <loading-button
              type="primary"
              size="mini"
              @click="borrow($event, row)"
              :disabled="row.num - row.borrowedNum <= 0"
            >
              借阅
            </loading-button>
          </div>
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
  name: 'UserRecommended',

  components: { BookTable, LoadingButton },

  data() {
    return {
      /** 总数 */
      total: 0,
      /** 图书 */
      books: []
    };
  },

  mounted() {
    this.getRecommended();
  },

  methods: {
    /** 获取推荐图书 */
    async getRecommended() {
      const response = await userApi.getRecommended();
      if (response.success) {
        this.books = response.data;
        this.total = this.books.length;
      } else {
        this.$message('获取推荐图书失败');
      }
    },

    /**
     * 借阅图书
     *
     * @param {()=>void} done 加载完成的回调函数
     * @param {import('@/api/book').BookInfo} book 图书信息
     */
    async borrow(done, book) {
      try {
        const response = await userApi.borrow(book.code);
        if (response.success) this.$message.success('借阅成功');
        else this.$message.error(response.msg);
      } catch (error) {
        this.$message.error('借阅失败');
      }
      await this.getRecommended();
      done();
    }
  }
};
</script>

<style lang="scss" scoped>
.table >>> .pagination {
  display: none;
}
</style>
