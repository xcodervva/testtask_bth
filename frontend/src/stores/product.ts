import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';

import { useProductApi } from '@/composables/useProductApi';
import type { Product, ProductPayload, Paginated } from '@/types/product';

export const useProductStore = defineStore('product', () => {
    const productApi = useProductApi();
    const products = ref<Product[]>([]);
    const page = ref<Paginated<Product> | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const total = ref(0);
    const initialized = ref(false);

    const withLoader = async (fn: () => Promise<void>) => {
        loading.value = true;
        const start = Date.now();

        try {
            await fn();
        } catch (e: any) {
            error.value = e.message ?? 'Error';
            throw e;
        } finally {
            const diff = Date.now() - start;

            if (diff < 1000) {
                await new Promise(r => setTimeout(r, 1000 - diff));
            }

            if (!initialized.value) initialized.value = true;
            loading.value = false;
        }
    };

    const fetchProducts = useDebounceFn(
        async (page = 1) => {
            await withLoader(async () => {
                const { data } = await productApi.getProducts(page);
                products.value = data.data;
                page = data.meta.current_page;
                total.value = data.meta.total;
            });
        },
        1000
    );

    const fetchProduct = async (id: number) => {
        await withLoader(async () => {
            const { data } = productApi.getProducts(id);
        });
    };

    const createProduct = async (payload: ProductPayload) => {
        await withLoader(() => productApi.create(payload));
    };

    const updateProduct = async (id: number, payload: ProductPayload) => {
        await withLoader(() => productApi.update(id, payload));
    };

    const deleteProduct = async (id: number) => {
        await withLoader(() => productApi.delete(id));
    };

    return {
        products,
        page,
        loading,
        error,
        fetchProducts,
        initialized,
        fetchProduct,
        createProduct,
        updateProduct,
        deleteProduct,
    };
});