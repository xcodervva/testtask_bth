<script setup lang="ts">
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/auth.ts';
import type { LoginCredentials } from '@/types/auth';

const auth = useAuthStore();

const loginTitles = {
  admin_enter: "Вход администратора",
  email: "Email",
  password: "Пароль",
  enterBtn: "Войти",
};

const form = reactive<LoginCredentials>({
  email: '',
  password: '',
});

const submit = async (): Promise<void> => {
  await auth.login(form);
}
</script>

<template>
  <el-card style="min-width: 500px; border-radius: 12px;">
    <h2>{{ loginTitles.admin_enter }}</h2>

    <el-form @submit.prevent="submit" label-position="top">
      <el-form-item :label="loginTitles.email">
        <el-input v-model="form.email" />
      </el-form-item>

      <el-form-item :label="loginTitles.password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>

      <el-alert
          v-if="auth.error"
          type="error"
          :title="auth.error"
          show-icon
          style="margin-bottom: 10px"
      />

      <el-button
          type="primary"
          native-type="submit"
          :loading="auth.loading"
          block
      >
        Войти
      </el-button>
    </el-form>
  </el-card>
</template>
