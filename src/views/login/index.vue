<template>
  <div class="container">
    <div class="main">
      <el-radio-group v-model="action" class="action-group">
        <el-radio-button label="login">登录</el-radio-button>
        <el-radio-button label="register">注册</el-radio-button>
      </el-radio-group>
      <el-form
        ref="form"
        :model="info"
        :rules="validateRules"
        :status-icon="true"
      >
        <el-form-item prop="username">
          <el-input v-model="info.username" placeholder="输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="info.password"
            placeholder="输入密码"
          />
        </el-form-item>
        <el-form-item v-if="isRegister" prop="confirm">
          <el-input
            type="password"
            v-model="info.confirm"
            placeholder="确认密码"
          />
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="info.code"
            class="code-input"
            placeholder="输入验证码"
          >
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
      <el-button
        class="submit"
        type="primary"
        v-loading="submitting"
        :disabled="submitting"
        @click="submit"
      >
        {{ isRegister ? '注 &nbsp; 册' : '登 &nbsp; 录' }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

/**
 * @callback Validator 表单验证规则
 * @param {Object} rule 该表单元素的验证规则
 * @param {string} value 该表单元素的值
 * @param {validateCallback} callback 请求回调函数
 * @param {Object} source 该表单元素的键与值
 * @param {Object} options 表单验证规则的附加选项
 */

export default {
  name: 'Login',

  data() {
    /** @type {Validator} 密码验证 */
    let validatePassword = () => {
      this.$refs.form.validateField('confirmPassword');
    };
    /** @type {Validator} 确认密码验证 */
    const validateConfirm = (_, value, callback) => {
      if (this.info.password && value) {
        if (value != this.info.password)
          callback(new Error('两次输入的密码不一致'));
        else callback();
      } else callback();
    };
    return {
      /** 需要进行的行为 */
      action: 'login',
      /** 用户信息 */
      info: {
        username: '',
        password: '',
        confirm: '',
        code: ''
      },
      /** 验证码地址 */
      codeSrc: '/api/login/code',
      /** 是否正在提交 */
      submitting: false,
      /** 验证码是否不可点击 */
      codeButtonDisabled: false,
      /** 表单验证规则 */
      validateRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输用户名' },
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
          },
          // { trigger: ['change', 'blur'], validator: validatePassword }
        ],
        confirm: [
          { required: true, trigger: 'blur', message: '请再次输入密码' },
          { trigger: ['change', 'blur'], validator: validateConfirm }
        ],
        code: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      }
    };
  },

  created() {
    this.getCode();
  },

  methods: {
    ...mapActions(['Register', 'Login']),

    /** 提交表单 */
    submit() {
      this.$refs.form.validate(async valid => {
        if (!valid) {
          this.$message.warning('请正确填写信息');
          return;
        }
        this.submitting = true;
        try {
          const data = await (this.isRegister ? this.Register : this.Login)(this.info);
          if (data.role === 1) {
            this.$router.replace('/admin');
          } else {
            this.$router.replace('/user');
          }
        } catch (error) {
          this.$message.error(error);
        }
        this.submitting = false;
        this.getCode();
      });
    },

    /** 获取验证码 */
    async getCode() {
      if (this.codeButtonDisabled) return;
      this.codeButtonDisabled = true;
      this.codeSrc = `/api/auth/code?time=${new Date().getTime()}}`;
    }
  },

  computed: {
    /** 是否选择注册 */
    isRegister() {
      return this.action == 'register';
    }
  }
};
</script>

<style scoped>
.container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url('~@/assets/imgs/login/background.png');
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
}
.main {
  position: absolute;
  display: flex;
  left: calc(50% - 176px);
  top: 30%;
  width: 350px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 10px 10px gray;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.action-group {
  width: 100%;
  margin-bottom: 30px;
}
.action-group > * {
  border-radius: 20px;
  width: 50%;
}
.action-group > * >>> span {
  width: 100%;
}
.action-group > *:nth-child(1) >>> .el-radio-button__inner {
  border-radius: 20px 0 0 0;
}
.action-group > *:nth-child(2) >>> .el-radio-button__inner {
  border-radius: 0 20px 0 0;
}
.code-input >>> .el-input-group__append {
  padding: 0;
}
.captcha {
  width: 120px;
  height: 34px;
}
.submit {
  margin-bottom: 20px;
}
</style>
