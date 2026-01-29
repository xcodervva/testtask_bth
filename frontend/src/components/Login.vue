<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

import { useAuthStore } from '@/stores/auth.ts';
import type { LoginCredentials } from '@/types/auth';

const auth = useAuthStore();

const formRef = ref<FormInstance>();

const loginTitles = {
  admin_enter: "Вход администратора",
  email: "Email",
  password: "Пароль",
  enterBtn: "Войти",
  rules: {
    enterEmail: 'Введите email',
    wrongEmail: 'Некорректный email',
    enterPassword: 'Введите пароль',
    wrongPassword: 'Пароль должен быть не короче 6 символов',
  },
};

const form = reactive<LoginCredentials>({
  email: '',
  password: '',
});


const rules: FormRules<LoginCredentials> = {
  email: [
    { required: true, message: loginTitles.rules.enterEmail, trigger: 'blur' },
    {
      type: 'email',
      message: loginTitles.rules.wrongEmail,
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    { required: true, message: loginTitles.rules.enterPassword, trigger: 'blur' },
    {
      min: 6,
      message: loginTitles.rules.wrongPassword,
      trigger: ['blur', 'change'],
    },
  ],
};

const submit = async (): Promise<void> => {
  if (!formRef.value) return;

  await formRef.value.validate(async (valid) => {
    if (!valid) return;

    await auth.login(form);
  });
}
</script>

<template>
  <el-card style="min-width: 500px; border-radius: 12px;">
    <h2>{{ loginTitles.admin_enter }}</h2>

    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        @submit.prevent="submit"
        label-position="top">
      <el-form-item :label="loginTitles.email" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>

      <el-form-item :label="loginTitles.password" prop="password">
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

<style lang="css">
.el-button.el-button--primary {
  outline: none;
}
</style>