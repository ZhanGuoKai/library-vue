<template>
  <div class="user-navbar">
    <el-menu
      class="menu"
      mode="horizontal"
      :default-active="$route.name"
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
import menuItems from '@/router/modules/user';

export default {
  name: 'UserNavbar',

  data() {
    return {
      menuItems
    };
  }
};
</script>

<style lang="scss" scoped>
.user-navbar {
  margin-bottom: 20px;
  width: 100%;

  > .menu {
    margin: 0 auto;
    width: fit-content;

    >>> .el-menu-item {
      margin: 0 10px;
      padding: 0 30px;
    }
  }
}
</style>
