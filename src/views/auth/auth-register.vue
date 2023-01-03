<template>
  <el-dialog title="注册账号" :visible.sync="visible" width="450px">
    <el-form :model="info" ref="form" :rules="validateRules" label-width="80px">
      <el-form-item prop="email" label="邮箱">
        <el-input class="input" v-model="info.email" placeholder="输入邮箱" />
      </el-form-item>
      <el-form-item prop="username" label="用户名">
        <el-input
          class="input"
          v-model="info.username"
          placeholder="输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          class="input"
          v-model="info.password"
          placeholder="输入密码"
          show-password
        />
      </el-form-item>
      <el-form-item prop="confirm" label="确认密码">
        <el-input
          class="input"
          v-model="info.confirm"
          placeholder="再次输入密码"
          show-password
        />
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

    <span slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button
        type="primary"
        v-loading="registering"
        :disabled="registering"
        @click="register"
      >
        注 &nbsp; 册
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import GetCodeButton from '@/components/get-code-button';

/**
 * @callback Validator 表单验证规则
 * @param {Object} rule 该表单元素的验证规则
 * @param {string} value 该表单元素的值
 * @param {validateCallback} callback 请求回调函数
 * @param {Object} source 该表单元素的键与值
 * @param {Object} options 表单验证规则的附加选项
 *
 * @typedef RegisterInfo 注册信息
 * @property {string} email 邮箱
 * @property {string} username 用户名
 * @property {string} password 密码
 * @property {string} confirm 确认密码
 * @property {string} code 验证码
 */

/** 邮箱验证正则表达式 */
const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

export default {
  name: 'AuthRegister',

  components: { GetCodeButton },

  data() {
    /** @type {Validator} 密码验证 */
    let validatePassword = () => {
      if (this.info.confirm !== '') this.$refs.form.validateField('confirm');
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
      /** 对话框是否可见 */
      visible: false,
      /** @type {RegisterInfo} 注册信息 */
      info: {
        email: '',
        username: '',
        password: '',
        confirm: '',
        code: ''
      },
      /** 是否正在注册 */
      registering: false,
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
          },
          { trigger: ['blur'], validator: validatePassword }
        ],
        confirm: [
          { required: true, trigger: 'blur', message: '请再次输入密码' },
          { trigger: ['change', 'blur'], validator: validateConfirm }
        ],
        code: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      }
    };
  },

  methods: {
    ...mapActions(['Register']),

    /** 显示对话框 */
    showDialog() {
      this.visible = true;
    },

    /** 注册 */
    async register() {
      this.registering = true;
      try {
        const data = await this.Register(this.info);
        if (data.role === 1) {
          this.$router.replace('/admin');
        } else {
          this.$router.replace('/user');
        }
      } catch (error) {
        this.$message.error(error);
      }
      this.registering = false;
    }
  }
};
</script>
