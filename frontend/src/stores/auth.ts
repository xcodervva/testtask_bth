import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { useAuthApi } from '@/composables/useAuthApi';
import api from '@/lib/axios';

import type { AuthResponse, LoginCredentials, User } from '@/types/auth';

export const useAuthStore = defineStore('auth', () => {
    // state (declarative)
    const token = ref<string | null>(localStorage.getItem('token'));
    const user = ref<User | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // getters
    const isAuthenticated = computed(() => !!token.value);

    // actions
    const login = async (credentials: LoginCredentials) => {
        loading.value = true;
        error.value = null;

        const authApi = useAuthApi();

        try {
            const data: AuthResponse = await authApi.login(credentials);

            token.value = data.token;
            localStorage.setItem('token', data.token);

            api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

            user.value = await authApi.me();
        } catch (e: any) {
            error.value = e?.response?.data?.message ?? 'Ошибка авторизации';
            throw e;
        } finally {
            loading.value = false;
        }
    };

    const logout = async () => {
        try {
            const authApi = useAuthApi();
            await authApi.logout();
        } finally {
            token.value = null;
            user.value = null;

            localStorage.removeItem('token');
            delete api.defaults.headers.common.Authorization;
        }
    };

    return {
        // state
        token,
        user,
        loading,
        error,

        // getters
        isAuthenticated,

        // actions
        login,
        logout,
    };
});