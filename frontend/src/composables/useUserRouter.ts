import { useRouter } from 'vue-router';
import { nextTick } from "@vue/runtime-core";
import type { RouteLocationRaw } from 'vue-router';

import { useUiStore } from '@/stores/ui';

export function useUserRouter() {
    const router = useRouter();
    const ui = useUiStore();

    const navigate = async (to: string | RouteLocationRaw) => {
        const resolved = router.resolve(to);

        if (!resolved.meta?.guest) {
            ui.startLoading('Загрузка страницы...');
            // даём Vue показать overlay
            await nextTick();
        }

        await router.push(to);
    };

    const goToLogin = () => navigate({ name: 'login' });

    const goToProducts = () => navigate({name: 'products'});

    const goToProductCreate = () => navigate({ name: 'products.create' });

    const goToProductEdit = (id: number) => navigate({ name: 'products.edit', params: { id }});

    return {
        goToLogin,
        goToProducts,
        goToProductCreate,
        goToProductEdit,
    };
}