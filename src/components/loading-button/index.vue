<template>
  <el-button
    v-bind="$attrs"
    :disabled="disabled || loading"
    v-loading="loading"
    @click.stop="handleClick"
  >
    <slot />
  </el-button>
</template>

<script>
export default {
  name: 'LoadingButton',

  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      /** 是否正在处理 */
      loading: false
    };
  },

  methods: {
    /** 处理点击事件 */
    handleClick() {
      if (this.loading) return;
      this.loading = true;
      this.$emit('click', () => {
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
