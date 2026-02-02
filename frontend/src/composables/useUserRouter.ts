import { useRouter } from 'vue-router';

export function useUserRouter() {
    const router = useRouter();

    const goToLogin = () => {
        router.push({ name: 'login' });
    };

    const goToProducts = async () => {
        await router.push({name: 'products'});
    };

    const goToProductCreate = async () => {
        await router.push({ name: 'products.create' });
    };

    const goToProductEdit = (id: number) => {
        router.push({ name: 'products.edit', params: { id } });
    };

    return {
        goToLogin,
        goToProducts,
        goToProductCreate,
        goToProductEdit,
    };
}