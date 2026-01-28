<script setup lang="ts">
import Login from './components/Login.vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
</script>

<template>
  <Login v-if="!auth.isAuthenticated" />
</template>

<style scoped>
</style>
