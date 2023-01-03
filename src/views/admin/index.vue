<template>
  <el-container class="admin">
    <!-- 侧边导航栏 -->
    <el-aside width="150px">
      <admin-navbar />
    </el-aside>
    <!-- 主体内容 -->
    <el-main>
      <transition name="el-fade-in" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
import AdminNavbar from './admin-navbar.vue';

export default {
  name: 'Admin',

  components: { AdminNavbar },

  data() {
    return {};
  },

  mounted() {},

  methods: {}
};
</script>

<style scoped>
.admin {
  height: calc(100vh);
}
</style>
