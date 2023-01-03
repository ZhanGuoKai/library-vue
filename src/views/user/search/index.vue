<template>
  <div>
    <search-book ref="table">
      <template slot-scope="{ row }">
        <div @click.stop="info(row.borrowing)">
          <loading-button
            :type="row.borrowing ? 'success' : 'primary'"
            size="mini"
            @click="handleClick($event, row)"
            :disabled="!row.borrowing && row.num - row.borrowedNum <= 0"
          >
            {{ row.borrowing ? '归还' : '借阅' }}
          </loading-button>
        </div>
      </template>
    </search-book>
  </div>
</template>

<script>
import SearchBook from '@/components/search-book/index.vue';
import LoadingButton from '@/components/loading-button/index.vue';
import userApi from '@/api/user';

export default {
  name: 'UserSearch',

  components: { SearchBook, LoadingButton },

  data() {
    return {};
  },

  methods: {
    /**
     * 借阅图书
     *
     * @param {()=>void} done 加载完成的回调函数
     * @param {import('@/api/book').BookInfo} book 图书信息
     */
    async handleClick(done, book) {
      if (book.borrowing) {
        try {
          const response = await userApi.returnBook(book.code);
          if (response.success) this.$message.success('归还成功');
          else this.$message.error(response.msg);
        } catch (error) {
          this.$message.error('归还失败');
        }
      } else {
        try {
          const response = await userApi.borrow(book.code);
          if (response.success) this.$message.success('借阅成功');
          else this.$message.error(response.msg);
        } catch (error) {
          this.$message.error('借阅失败');
        }
      }
      done();
      this.$refs.table.search();
    },

    /**
     * 提示信息
     * @param {boolean} borrowing 是否正在借阅
     */
    info(borrowing) {
      if (borrowing) this.$message.info('你已经借阅了这本书，不能重复借阅');
      else this.$message.info('这本书已经被借光了，无法借阅');
    }
  }
};
</script>

<style lang="scss" scoped></style>
