<template>
  <el-container class="book">
    <el-header height="fit-container">
      <!-- 图书名 -->
      <el-skeleton :loading="loading" :animated="true" :rows="1">
        <template slot="template">
          <el-skeleton-item class="title-skeleton"></el-skeleton-item>
        </template>
        <template>
          <h2>{{ data.name }}</h2>
        </template>
      </el-skeleton>
    </el-header>

    <el-container>
      <!-- 图书封面 -->
      <el-aside width="200px">
        <el-skeleton :loading="loading" :animated="true">
          <template slot="template">
            <el-skeleton-item class="image-skeleton" variant="image" />
          </template>
          <template>
            <el-image
              class="book-image"
              v-if="data.photoUrl"
              :src="imageUrl"
              fit="contain"
              title="点击查看大图"
              :alt="`《${data.name}》封面`"
              @click="showBookImage"
            />
          </template>
        </el-skeleton>
      </el-aside>

      <!-- 图书详细信息 -->
      <el-main>
        <el-skeleton :loading="loading" :animated="true">
          <template v-for="{ prop, name } in props">
            <div v-if="data[prop]" :key="prop">
              {{ `${name}: ${data[prop]}` }}
            </div>
          </template>
        </el-skeleton>
      </el-main>

      <!-- 评分 -->
      <el-aside width="200px">
        <h4>豆瓣评分</h4>
        <el-skeleton :loading="loading" :animated="true" :rows="3">
          <template>
            <div class="score">
              <span class="score-text">{{ data.doubanScore }}</span>
              <el-rate v-model="score" :max="5" disabled />
            </div>
            <div class="score-num">{{ data.numScore }}人评价</div>
          </template>
        </el-skeleton>
      </el-aside>
    </el-container>

    <!-- 图书简介 -->
    <el-footer height="fit-content">
      <h3>图书简介</h3>
      <el-skeleton :loading="loading" :animated="true" :rows="4">
        <template>
          <long-text v-if="data.description" :text="data.description" />
          <p v-else>（这本书暂时没有简介）</p>
        </template>
      </el-skeleton>

      <!-- 作者简介 -->
      <h3>作者简介</h3>
      <el-skeleton :loading="loading" :animated="true" :rows="4">
        <template>
          <long-text v-if="data.authorIntro" :text="data.authorIntro" />
          <p v-else>（这个作者暂时没有简介）</p>
        </template>
      </el-skeleton>
    </el-footer>
  </el-container>
</template>

<script>
import bookApi from '@/api/book';
import LongText from '@/components/long-text/index.vue';

export default {
  name: 'BookDetails',

  components: { LongText },

  data() {
    return {
      /** @type {import('@/api/book').BookDetails} 图书数据 */
      data: {},
      /** 是否正在加载数据 */
      loading: true,
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
      ],
      /** 豆瓣评分 */
      score: 0,
      /** 图片地址 */
      imageUrl: ''
    };
  },

  methods: {
    /** 获取图书详细信息 */
    async getDetails() {
      this.loading = true;
      this.data = {};
      this.visible = true;
      const response = await bookApi.details(this.$route.params.isbn);
      if (response.success) {
        this.data = response.data;
        this.score = this.data.doubanScore / 20;
        this.imageUrl = `/api/images/books/${this.data.photoUrl}`;
      }
      this.loading = false;
    },

    /** 查看图片 */
    showBookImage() {
      window.open(this.imageUrl, '_blank');
    }
  },

  watch: {
    '$route.params.isbn': {
      immediate: true,
      handler() {
        this.getDetails();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.book {
  margin: 0 auto;
  padding: 20px 0;
  min-width: 750px;
  max-width: 1000px;
}

.title-skeleton {
  height: 32px;
  margin-top: 19.92px;
}

.image-skeleton {
  width: 200px;
  height: 295.55px;
}

.book-image {
  cursor: pointer;
}

.el-main {
  max-width: 400px;
}

.score > {
  * {
    display: inline;
    vertical-align: middle;
  }

  .score-text {
    font-size: 16px;
    color: #f7ba2a;
  }
}

.score-num {
  margin-top: 5px;
  margin-left: 2em;
  font-size: 12px;
  color: #333;
}

.intro {
  margin-top: 20px;
}
</style>
