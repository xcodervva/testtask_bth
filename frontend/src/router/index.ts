import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/components/Login.vue'),
        meta: { guest: true },
    },
    {
        path: '/admin/products',
        name: 'products',
        component: () => import('@/components/admin/Products.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/admin/products/create',
        name: 'products.create',
        component: () => import('@/components/admin/ProductCreate.vue'),
        meta: { requiresAuth: true },
    },
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