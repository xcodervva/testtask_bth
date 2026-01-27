<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const counter = useCounterStore();
</script>

<template>
  <el-card style="max-width: 500px; margin: 40px auto">
    <h2>Element Plus работает ✅</h2>

    <p>Значение: {{ counter.count }}</p>

    <el-button type="primary" @click="counter.increment">
      +
    </el-button>
  </el-card>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
