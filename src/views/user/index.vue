<template>
  <div id="user">
    <div class="main">
      <!-- 导航栏 -->
      <user-navbar />

      <!-- 主体内容 -->
      <transition name="el-fade-in" mode="out-in">
        <router-view />
      </transition>
    </div>

    <!-- 回到顶部 -->
    <el-backtop target="#user" :right="100" :bottom="100">
      <i class="el-icon-top back-top" />
    </el-backtop>
  </div>
</template>

<script>
import UserNavbar from './user-navbar.vue';

export default {
  name: 'User',

  components: { UserNavbar }
};
</script>

<style lang="scss" scoped>
#user {
  margin: 0 auto;
  max-height: calc(100vh);
  width: fit-content;
}

.main {
  margin: 0 auto;
  min-width: 1000px;
  max-width: 1200px;
}
</style>
