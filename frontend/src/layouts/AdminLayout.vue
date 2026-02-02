<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useUserRouter } from '@/composables/useUserRouter';
import {storeToRefs} from "pinia";

const authStore = useAuthStore();

const adminLayoutTitles = {
  goods: 'Админка товаров',
  logout: 'Выйти',
};

const { goToLogin } = useUserRouter();
const { loading } = storeToRefs(authStore);

const logout = async () => {
  await authStore.logout();
  goToLogin();
}
</script>

<template>
  <el-container>
    <!-- Header -->
    <el-header
        style="display: flex; align-items: center; justify-content: space-between"
    >
      <div style="font-weight: 600">
        {{ adminLayoutTitles.goods }}
      </div>

      <el-button type="danger" plain @click="logout">
        {{ adminLayoutTitles.logout }}
      </el-button>
    </el-header>

    <!-- Content -->
    <el-main>
      <slot />
    </el-main>
  </el-container>
</template>