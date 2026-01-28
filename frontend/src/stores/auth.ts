import { defineStore } from 'pinia';
import { useAuthApi } from '@/composables/useAuthApi';
import api from '@/lib/axios';

import type { AuthResponse, LoginCredentials, User } from "@/types/auth";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') as string | null,
        user: null as User | null,
        loading: false,
        error: null as string | null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async login(credentials: LoginCredentials) {
            this.loading = true;
            this.error = null;

            const authApi = useAuthApi();

            try {
                const data: AuthResponse = await authApi.login(credentials);

                this.token = data.token;
                localStorage.setItem('token', this.token);
                api.defaults.headers.common.Authorization = `Bearer ${this.token}`;

                this.user = await authApi.me();
            } catch (e) {
                this.error = e.response?.data?.message || 'Ошибка авторизации';
                throw e;
            } finally {
                this.loading = false;
            }
        },

        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            delete api.defaults.headers.common.Authorization;
        },
    },
});
