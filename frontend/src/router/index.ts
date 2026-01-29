import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import Login from '@/components/Login.vue';
import Products from '@/components/admin/Products.vue';

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
        meta: { guest: true },
    },
    {
        path: '/admin/products',
        name: 'products',
        component: Products,
        meta: { requiresAuth: true },
    },
    // {
    //     path: '/admin/products/create',
    //     name: 'products.create',
    //     component: ProductCreate,
    //     meta: { requiresAuth: true },
    // },
    // {
    //     path: '/admin/products/:id/edit',
    //     name: 'products.edit',
    //     component: ProductEdit,
    //     meta: { requiresAuth: true },
    // },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    const auth = useAuthStore();

    // если маршрут требует авторизацию
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        return { name: 'login' };
    }

    // если залогинен — не пускаем на login
    if (to.meta.guest && auth.isAuthenticated) {
        return { name: 'products' };
    }
});