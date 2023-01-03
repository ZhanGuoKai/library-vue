<template>
  <el-button
    :class="{ button: true, enable: !codeButtonDisabled }"
    slot="append"
    type="success"
    :disabled="codeButtonDisabled"
    @click="getCode"
  >
    {{ codeButtonText }}
  </el-button>
</template>

<script>
import authApi from '@/api/auth';

/** 邮箱验证正则表达式 */
const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

export default {
  name: 'GetCodeButton',

  props: {
    email: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      /** 再次发送验证码剩余的时间 */
      time: 0,
    };
  },

  methods: {
    /** 获取验证码 */
    async getCode() {
      if (this.email && emailReg.test(this.email)) {
        try {
          // 发起请求获取验证码
          await authApi.getVerificationCode(this.email);
          this.$message.success('发送成功！');
          // 60秒内不能点击发送按钮
          this.time = 60;
          const timer = setInterval(() => {
            this.time--;
            if (this.time == 0) clearInterval(timer);
          }, 1000);
        } catch (error) {
          this.$message.error(error);
        }
      } else {
        this.$message.warning('请正确输入邮箱地址');
      }
    },
  },

  computed: {
    /** 验证码按钮文字 */
    codeButtonText() {
      return this.time == 0 ? '发送验证码' : `再次发送(${this.time})`;
    },

    /** 验证码按钮是否不可用 */
    codeButtonDisabled() {
      return this.time != 0;
    }
  }
};
</script>

<style lang="scss" scoped>
$enable-color: #67c23a;
$enable-hover-color: #85ce61;
$enable-active-color: #5daf34;

.button {
  background-color: transparent !important;
  border-color: transparent !important;
  color: #C0C4CC !important;
}

.enable {
  width: 123px;
  background-color: $enable-color !important;
  border-color: $enable-color !important;
  color: #fff !important;
}

.enable:hover {
  background-color: $enable-hover-color !important;
  border-color: $enable-hover-color !important;
}

.enable:active {
  background-color: $enable-active-color !important;
  border-color: $enable-active-color !important;
}</style>
