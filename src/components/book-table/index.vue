<template>
  <div class="book-table">
    <!-- 图书基本信息 -->
    <el-table
      class="table"
      v-loading="searching"
      :data="books"
      :border="true"
      :highlight-current-row="true"
      header-cell-class-name="table-header"
      cell-class-name="table-row"
      @row-click="showDetails"
    >
      <el-table-column
        prop="code"
        label="国际标准书号"
        show-overflow-tooltip
        min-width="110px"
      />
      <el-table-column prop="name" label="书名" show-overflow-tooltip />
      <el-table-column prop="author" label="作者" show-overflow-tooltip />
      <el-table-column prop="publishing" label="出版社" show-overflow-tooltip />
      <el-table-column prop="translator" label="译者" show-overflow-tooltip />
      <el-table-column prop="published" label="出版时间" width="80px">
        <template slot-scope="{ row }">
          {{ row.published | formatTime('yyyy-MM') }}
        </template>
      </el-table-column>
      <el-table-column prop="pages" label="页数" width="60px" />

      <slot />
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="pagination"
      :current-page.sync="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="limit"
      :background="true"
      layout="sizes, prev, pager, next, jumper"
      :total="total"
      @current-change="fetchData"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
export default {
  name: 'BookTable',

  props: {
    total: {
      type: Number,
      required: true
    },
    books: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      /** 页数 */
      page: 1,
      /** 限制数 */
      limit: 10,
      /** 是否在搜索中 */
      searching: false
    };
  },

  mounted() {},

  methods: {
    /** 获取数据 */
    async fetchData() {
      this.searching = true;
      this.$emit('fetch-data', this.page, this.limit, () => {
        this.searching = false;
      });
    },

    /** 处理每页数量的变化 */
    handleSizeChange() {
      this.page = 1;
      this.fetchData();
    },

    /**
     * 显示书本详细信息
     * @param {import('@/api/book').BookInfo} bookInfo 图书信息
     */
    showDetails({ code }) {
      window.open(`#/book/${code}`, '_blank');
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  margin-top: 20px;

  >>> .table-header {
    text-align: center;
    color: black;
  }

  >>> .table-row {
    text-align: center;
    cursor: pointer;
  }
}

.pagination {
  margin: 10px auto;
  width: fit-content;
}
</style>
