<template>
  <div>
    <div class="paragraphs" ref="text" :class="{ hidden }">
      <p v-for="(paragraph, index) in paragraphs" :key="index">
        {{ paragraph }}
      </p>
    </div>
    <el-button
      class="text-btn"
      v-if="showBtn"
      type="text"
      @click="hidden = !hidden"
    >
      {{ btnText }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'LongText',

  props: {
    text: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      hidden: true,
      showBtn: false
    };
  },

  mounted() {
    this.$nextTick(() => this.handleTextChanged());
  },

  methods: {
    /** 处理文字变化 */
    handleTextChanged() {
      const text = this.$refs.text;
      this.showBtn = text.clientHeight < text.scrollHeight;
    }
  },

  computed: {
    /** 段落 */
    paragraphs() {
      return this.text.split('\n');
    },

    /** 按钮文字 */
    btnText() {
      return this.hidden ? '显示更多' : '收起';
    }
  },

  watch: {
    /** 监听文字变化 */
    text() {
      this.hidden = true;
      this.handleTextChanged();
    }
  }
};
</script>

<style lang="scss" scoped>
.paragraphs {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: none;

  > p {
    margin: 5px;
    text-indent: 2em;
  }
}

.hidden {
  -webkit-line-clamp: 6;
}

.text-btn {
  display: block;
  margin: 5px auto;
}
</style>
