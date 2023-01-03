<template>
  <div>
    <div class="container">
      <div class="main">
        <el-radio-group v-model="loginMethod" class="action-group">
          <el-radio-button label="password">账号密码登录</el-radio-button>
          <el-radio-button label="email">邮箱验证登录</el-radio-button>
        </el-radio-group>
        <keep-alive>
          <component ref="loginForm" :is="loginFormComponent" />
        </keep-alive>
        <el-button
          class="login-btn"
          type="primary"
          v-loading="logging"
          :disabled="logging"
          @click="login"
        >
          登 &nbsp; 录
        </el-button>
        <el-button
          class="register-btn"
          type="text"
          size="default"
          @click="showRegister"
        >
          注册账号
        </el-button>
      </div>
    </div>
    <auth-register ref="registerDialog" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AuthEmail from './auth-email.vue';
import AuthPassword from './auth-password.vue';
import AuthRegister from './auth-register.vue';

export default {
  name: 'Login',

  components: {
    AuthPassword,
    AuthEmail,
    AuthRegister
  },

  data() {
    return {
      /** 登录方式 */
      loginMethod: 'password',
      /** 是否正在登录 */
      logging: false
    };
  },

  methods: {
    ...mapActions(['Login']),

    /** 登录 */
    async login() {
      try {
        const info = await this.$refs.loginForm.login();
        this.logging = true;
        try {
          const data = await this.Login(info);
          if (data.role === 1) {
            this.$router.replace('/admin');
          } else {
            this.$router.replace('/user');
          }
        } catch (error) {
          this.$message.error(error);
        }
        if (this.loginMethod === 'password') this.$refs.loginForm.getCode();
        this.logging = false;
      } catch (error) {}
    },

    /** 显示注册登录框 */
    showRegister() {
      this.$refs.registerDialog.showDialog();
    }
  },

  computed: {
    /** 登录表单组件名 */
    loginFormComponent() {
      return this.loginMethod == 'password' ? 'AuthPassword' : 'AuthEmail';
    }
  }
};
</script>

<style lang="scss" scoped>
$main-height: 340px;

.container {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: {
    image: url('~@/assets/imgs/login/background.png');
    repeat: no-repeat;
    size: cover;
  }
}

.main {
  position: relative;
  display: flex;
  width: 400px;
  height: $main-height;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 5px 5px #0007;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.action-group {
  width: 100%;
  margin-bottom: 30px;

  > * {
    border-radius: 20px;
    width: 50%;

    >>> span {
      width: 100%;
    }

    &:nth-child(1) >>> .el-radio-button__inner {
      border-radius: 20px 0 0 0;
    }

    &:nth-child(2) >>> .el-radio-button__inner {
      border-radius: 0 20px 0 0;
    }
  }
}

.login-btn {
  position: absolute;
  top: $main-height - 82px;
}

.register-btn {
  position: absolute;
  top: $main-height - 42px;
}
</style>
