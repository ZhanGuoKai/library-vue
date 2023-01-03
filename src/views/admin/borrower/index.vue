<template>
  <el-container>
    <el-header height="50px">
      <!-- 搜索栏 -->
      <el-input
        v-model="isbn"
        placeholder="请输入isbn"
        @keyup.enter.native="search"
      >
        <!-- 搜索按钮 -->
        <el-button slot="append" icon="el-icon-search" @click="search" />
      </el-input>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 图书封面图片 -->
        <el-skeleton :loading="loading" :animated="true">
          <template slot="template">
            <el-skeleton-item class="image-skeleton" variant="image" />
          </template>
          <template>
            <el-image
              class="book-image"
              v-if="bookInfo && bookInfo.photoUrl"
              :src="imageSrc"
              fit="contain"
              title="点击查看大图"
              :alt="`《${bookInfo.name}》封面`"
              @click="showBookImage"
            />
          </template>
        </el-skeleton>
      </el-aside>
      <el-main>
        <!-- 图书信息 -->
        <el-skeleton :loading="loading" :animated="true">
          <template v-for="{ prop, name } in props">
            <div v-if="bookInfo[prop]" :key="prop">
              {{ name }}: {{ bookInfo[prop] }}
            </div>
          </template>
        </el-skeleton>
      </el-main>
    </el-container>
    <el-footer height="fit-content">
      <el-table
        class="table"
        v-loading="loading"
        :data="borrowers"
        :border="true"
        :highlight-current-row="true"
        header-cell-class-name="table-header"
        cell-class-name="table-row"
      >
        <el-table-column prop="username" label="用户名" show-overflow-tooltip />
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip />
        <el-table-column label="借阅时间">
          <template slot-scope="{ row }">
            {{ row.borrow.borrowTime | formatTime('yyyy-MM-dd -hh-mm-ss') }}
          </template>
        </el-table-column>

        <slot />
      </el-table>
    </el-footer>
  </el-container>
</template>

<script>
import adminApi from '@/api/admin';

/**
 * @typedef {import('@/api/book').BookInfo} BookInfo 图书信息
 * @typedef {import('@/api/admin').Borrower} Borrower 借阅者信息
 */

export default {
  name: 'AdminBorrower',

  data() {
    return {
      loading: false,
      /** 国际标准书号 */
      isbn: '',
      imageSrc: '',
      /** @type {BookInfo} 图书信息 */
      bookInfo: {},
      /** @type {Borrower[]} 借阅者 */
      borrowers: [],
      /** @type {{prop:string,name:string}[]} 图书信息参数 */
      props: [
        { prop: 'author', name: '作者' },
        { prop: 'publishing', name: '出版社' },
        { prop: 'subname', name: '副标题' },
        { prop: 'translator', name: '译者' },
        { prop: 'published', name: '出版时间' },
        { prop: 'pages', name: '页数' },
        { prop: 'price', name: '定价' },
        { prop: 'designed', name: '装帧' },
        { prop: 'code', name: 'ISBN' }
      ]
    };
  },

  methods: {
    /** 搜索 */
    async search() {
      if (!this.isbn) return;
      this.loading = true;
      const response = await adminApi.getBorrowers(this.isbn);
      if (response.success) {
        this.bookInfo = response.data.book;
        this.borrowers = response.data.borrowers;
        this.imageSrc = `/api/images/books/${this.bookInfo.photoUrl}`;
      } else this.$message.error(response.msg);
      this.loading = false;
    },

    /** 查看图书封面 */
    showBookImage() {
      window.open(this.imageSrc, '_blank');
    }
  },

  watch: {
    '$route.query.isbn': {
      immediate: true,
      handler(value) {
        if (value) {
          this.isbn = value;
          this.search();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
