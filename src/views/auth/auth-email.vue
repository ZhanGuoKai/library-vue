<template>
  <el-form
    ref="form"
    :model="info"
    label-width="80px"
    :rules="validateRules"
    :status-icon="true"
  >
    <el-form-item prop="email" label="邮箱">
      <el-input class="input" v-model="info.email" placeholder="输入邮箱" />
    </el-form-item>
    <el-form-item prop="code" label="验证码">
      <el-input
        v-model="info.code"
        class="input code-input"
        placeholder="输入验证码"
      >
        <get-code-button slot="append" :email="info.email" />
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import GetCodeButton from '@/components/get-code-button';

/**
 * @typedef LoginInfo 登录信息
 * @property {string} email 邮箱
 * @property {string} code 验证码
 */

/** 邮箱验证正则表达式 */
const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

export default {
  name: 'AuthEmail',

  components: { GetCodeButton },

  data() {
    return {
      /** @type {LoginInfo} 用户信息 */
      info: {
        email: '',
        code: ''
      },
      /** 再次发送验证码剩余的时间 */
      time: 0,
      /** 表单验证规则 */
      validateRules: {
        email: [
          { required: true, trigger: 'blur', message: '请输入邮箱' },
          {
            pattern: emailReg,
            trigger: 'blur',
            message: '请正确输入邮箱地址'
          }
        ],
        code: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      }
    };
  },

  methods: {
    /**
     * 登录
     * @return {Promise<LoginInfo>}
     */
    async login() {
      try {
        await this.$refs.form.validate();
        return this.info;
      } catch (error) {
        throw error;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.input {
  width: 280px;
}
</style>
