<template>
  <el-config-provider :locale="zhCn" :size="size" :z-index="3000">
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          <app-aside></app-aside>
        </el-aside>
        <el-container>
          <el-header>
            <app-header></app-header>
          </el-header>
          <el-main>
            <app-main></app-main>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </el-config-provider>
</template>

<style lang="scss">

.common-layout .el-header, {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.common-layout .el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.common-layout .el-main {
  //background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
}

.common-layout > .el-container {
  height: 100vh;
}
</style>
<script setup lang="ts">

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Cookies from 'js-cookie'
import AppMain from '@/layout/AppMain.vue'
import AppHeader from '@/layout/AppHeader.vue'
import AppAside from '@/layout/AppAside.vue'

const size = Cookies.get('size') || 'small'
</script>
