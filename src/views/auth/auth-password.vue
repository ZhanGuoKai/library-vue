<template>
  <el-form
    ref="form"
    :model="info"
    label-width="80px"
    :rules="validateRules"
    :status-icon="true"
  >
    <el-form-item prop="username" label="用户名">
      <el-input class="input" v-model="info.username" placeholder="输入用户名" />
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input class="input" v-model="info.password" placeholder="输入密码" show-password />
    </el-form-item>
    <el-form-item prop="code" label="验证码">
      <el-input v-model="info.code" class="input code-input" placeholder="输入验证码">
        <el-image
          slot="append"
          class="captcha"
          :src="codeSrc"
          @click="getCode"
          @load="codeButtonDisabled = false"
          @error="codeButtonDisabled = false"
        >
          验证码
        </el-image>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
/**
 * @typedef LoginInfo 登录信息
 * @property {string} username 用户名
 * @property {string} password 密码
 * @property {string} code 验证码
 */
export default {
  name: 'AuthPassword',

  data() {
    return {
      /** @type {LoginInfo} 用户信息 */
      info: {
        username: '',
        password: '',
        code: ''
      },
      /** 验证码地址 */
      codeSrc: '/api/auth/code',
      /** 验证码是否不可点击 */
      codeButtonDisabled: false,
      /** 表单验证规则 */
      validateRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
          { min: 4, max: 20, trigger: 'blur', message: '用户名长度为4~20' },
          {
            pattern: /^[a-zA-Z\d]*$/,
            trigger: 'blur',
            message: '用户名只能包含数字或字母'
          }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { min: 6, max: 20, trigger: 'blur', message: '密码长度为6~20' },
          {
            pattern: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z]*$/,
            trigger: ['change', 'blur'],
            message: '密码必须且只能包含数字和字母'
          }
        ],
        code: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      }
    };
  },

  methods: {
    /** 获取验证码 */
    getCode() {
      if (this.codeButtonDisabled) return;
      this.codeButtonDisabled = true;
      this.codeSrc = `/api/auth/code?time=${new Date().getTime()}}`;
    },

    /** 
     * 登录
     * @return {Promise<LoginInfo>}
     */
    async login() {
      try {
        await this.$refs.form.validate();
        return this.info;
      } catch (error) {
        await this.getCode();
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

.code-input >>> .el-input-group__append {
  padding: 0;
}

.captcha {
  width: 120px;
  height: 34px;
}
</style>
