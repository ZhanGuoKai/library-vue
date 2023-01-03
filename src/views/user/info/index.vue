<template>
  <div class="user-info">
    <p>用户名：{{ username }}</p>
    <p>邮箱：{{ email }}</p>
    <el-button class="logout" type="primary" @click="Logout">登出</el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapState } from 'vuex';

export default {
  name: 'UserInfo',

  methods: {
    ...mapActions(['Logout'])
  },

  computed: mapState({
    username: state => state.user.username,
    email: state => state.user.email
  })
};
</script>

<style lang="scss" scoped>
.user-info {
  width: fit-content;
  margin: 0 auto;
}

.logout {
  display: block;
  margin: 0 auto;
}
</style>
