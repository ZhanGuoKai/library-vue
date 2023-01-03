<template>
  <div class="admin-navbar">
    <el-menu
      :default-active="$route.name"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item
        v-for="item in menuItems.children"
        :key="item.name"
        :index="item.name"
        :route="item"
      >
        {{ item.meta.title }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import menuItems from '@/router/modules/admin';

export default {
  name: 'AdminNavbar',

  data() {
    return {
      menuItems
    };
  }
};
</script>

<style lang="scss" scoped>
.admin-navbar {
  position: fixed;
  width: 150px;
  height: calc(100vh);
}

.el-menu {
  height: 100%;
}
</style>
