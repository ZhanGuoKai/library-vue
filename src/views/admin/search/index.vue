<template>
  <div>
    <search-book operation-width="200px">
      <template slot-scope="{ row: { code } }">
        <el-button type="primary" size="mini" @click.stop="enter(code)">
          录入
        </el-button>
        <router-link :to="{ name: 'admin-borrower', query: { isbn: code } }">
          <el-button type="success" size="mini" @click.stop>
            查看借阅者
          </el-button>
        </router-link>
      </template>
    </search-book>
  </div>
</template>

<script>
import SearchBook from '@/components/search-book/index.vue';
import adminApi from '@/api/admin';

export default {
  name: 'AdminEnter',

  components: { SearchBook },

  data() {
    return {};
  },

  methods: {
    /**
     * 录入图书
     * @param {string} isbn 国际标准书号
     * @returns {Promise<void>}
     */
    async enter(isbn) {
      const msg = this.$message;
      await this.$prompt('请输入录入数量', '录入图书', {
        type: 'success',
        confirmButtonText: '录入',
        cancelButtonText: '取消',
        inputPattern: /^(?!0$)\d+$/,
        inputType: 'number',
        inputErrorMessage: '请输入数字',
        async beforeClose(action, instance, done) {
          if (action !== 'confirm') {
            if (!instance.confirmButtonLoading) done();
            return;
          }
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = '录入中';
          try {
            const response = await adminApi.enterBook(
              isbn,
              instance.inputValue
            );
            if (response.success) msg.success('录入成功');
            else msg.error(response.msg);
          } catch (error) {
            msg.error('录入失败');
          }
          done();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
