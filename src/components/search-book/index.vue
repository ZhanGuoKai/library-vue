<template>
  <div class="search-book">
    <el-row type="flex" justify="space-around">
      <el-col :span="12">
        <!-- 搜索框 -->
        <el-input
          class="search"
          placeholder="请输入内容"
          v-model="inputValue"
          @keyup.enter.native="search"
        >
          <!-- 搜索字段选择下拉框 -->
          <el-select v-model="inputKey" slot="prepend" placeholder="请选择">
            <el-option label="ISBN" value="code" />
            <el-option label="书名" value="name" />
            <el-option label="作者" value="author" />
            <el-option label="出版社" value="publishing" />
          </el-select>

          <!-- 搜索按钮 -->
          <el-button slot="append" icon="el-icon-search" @click="search" />
        </el-input>
      </el-col>
    </el-row>
    <span class="total">共找到 {{ total }} 本书</span>

    <!-- 图书基本信息 -->
    <book-table
      ref="table"
      :total="total"
      :books="books"
      @fetch-data="fetchData"
    >
      <el-table-column prop="num" label="总数量" width="80px" />
      <el-table-column prop="borrowedNum" label="借出数量" width="100px" />
      <el-table-column label="操作" :width="operationWidth" fixed="right">
        <template slot-scope="{ row }">
          <slot :row="row" />
        </template>
      </el-table-column>
    </book-table>
  </div>
</template>

<script>
import BookTable from '../book-table/index.vue';
import bookApi from '@/api/book';

export default {
  name: 'SearchBook',

  components: { BookTable },

  props: {
    'operation-width': {
      type: String,
      default: '80px'
    }
  },

  data() {
    return {
      /** 选择的字段 */
      inputKey: 'name',
      /** 输入的内容 */
      inputValue: '',
      /** 选择搜索的字段 */
      searchKey: 'name',
      /** 搜索的内容 */
      searchValue: '',
      /** 图书列表 */
      books: [],
      /** 总数 */
      total: 0
    };
  },

  methods: {
    /** 搜索 */
    search() {
      this.searchKey = this.inputKey;
      this.searchValue = this.inputValue;
      this.$refs.table.fetchData();
    },

    /**
     * 获取数据
     *
     * @param {number} page 当前页码
     * @param {number} limit 当前页码
     * @param {()=>void} done 获取数据结束的回调函数
     */
    async fetchData(page, limit, done) {
      try {
        const response = await bookApi.search(
          this.searchKey,
          this.searchValue,
          limit,
          page
        );
        if (response.success) {
          this.total = response.data.total;
          this.books = response.data.books;
        }
      } catch (error) {
        this.$message.error(error);
      }
      done();
    }
  }
};
</script>

<style lang="scss" scoped>
.search-book {
  min-width: 750px;
}

.search {
  width: 420px;

  > .el-input-group__prepend {
    background-color: #fff;

    > .el-select {
      width: 100px;
    }
  }
}

.total {
  display: inline-block;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
