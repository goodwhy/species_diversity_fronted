<template>
  <div>我是页面</div>
  <el-button @click="() => { ElMessage.success('点击成功')}">按钮</el-button>
</template>
<script setup>
import { ElMessage } from 'element-plus'
</script>
<style scoped>
</style>
