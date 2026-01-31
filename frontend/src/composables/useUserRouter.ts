import { useRouter } from 'vue-router';

import { useWithLoader } from '@/composables/useWithLoader';

export function useUserRouter() {
    const router = useRouter();
    const {
        loading: routingLoading,
        withLoader,
    } = useWithLoader(300);

    const goToLogin = () => {
        router.push({ name: 'login' });
    };

    const goToProducts = () => {
        router.push({ name: 'products' });
    };

    const goToProductCreate = async () => {
        await withLoader(async () => {
            await router.push({ name: 'products.create' });
        });
    };

    const goToProductEdit = (id: number) => {
        router.push({ name: 'products.edit', params: { id } });
    };

    return {
        goToLogin,
        goToProducts,
        goToProductCreate,
        goToProductEdit,
        routingLoading,
    };
}