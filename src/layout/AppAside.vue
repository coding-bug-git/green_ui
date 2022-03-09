<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    style="height: 100vh"
    :router="true"
  >

    <el-menu-item index="/test1">
      <template #title>
        <el-icon>
          <home-filled />
        </el-icon>
        <span>首页</span>
      </template>
    </el-menu-item>

    <el-sub-menu index="/sys">
      <template #title>
        <el-icon>
          <operation />
        </el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/sys/user">
        <template #title>
          <el-icon>
            <user />
          </el-icon>
          <span>用户管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/sys/role">
        <template #title>
          <el-icon>
            <rank />
          </el-icon>
          <span>角色管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/sys/menu">
        <template #title>
          <el-icon>
            <Menu />
          </el-icon>
          <span>菜单管理</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <tools />
        </el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="2-2">
        <template #title>
          <el-icon>
            <tickets />
          </el-icon>
          <span>数字字典</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>

</template>
<script>

</script>
