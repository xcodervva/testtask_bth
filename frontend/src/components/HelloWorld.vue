<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <el-card style="max-width: 500px; margin: 40px auto">
    <h2>Element Plus работает ✅</h2>

    <el-button type="primary">
      Кнопка Element Plus
    </el-button>
  </el-card>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
