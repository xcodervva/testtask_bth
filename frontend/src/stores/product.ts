import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';

import { useProductApi } from '@/composables/useProductApi';
import { useWithLoader } from '@/composables/useWithLoader';
import type { Product, ProductPayload, Paginated } from '@/types/product';

export const useProductStore = defineStore('product', () => {
    const productApi = useProductApi();
    const products = ref<Product[]>([]);
    const productById = ref<Product>({});
    const page = ref<number | null>(1);
    const total = ref(0);
    const perPage = ref<number | null>(null);
    const search = ref<string| null>(null);

    const {
        loading,
        initialized,
        error,
        withLoader,
    } = useWithLoader(1000);

    const fetchProducts =
        async () => {
            await withLoader(async () => {
                const params = {
                    page: page.value,
                    search: search.value || undefined,
                };

                const {data} = await productApi.getProducts(params);
                products.value = data.data;
                page.value = data.meta.current_page;
                perPage.value = data.meta.per_page;
                total.value = data.meta.total;
            });
        };

    const fetchProductById = async (id: number) => {
        await withLoader(async () => {
            const {data} = await productApi.getProductById(id);
            productById.value = data.data;
        });
    };

    const createProduct = async (payload: ProductPayload) => {
            await withLoader(async () => {
                await productApi.createProduct(payload);
                await fetchProducts();
            });
    };

    const updateProduct = async (id: number, payload: ProductPayload) => {
        await withLoader(async () => {
            await productApi.updateProduct(id, payload);
            await fetchProducts();
        });
    };

    const deleteProduct = async (id: number) => {
        await withLoader(async () => {
            await productApi.deleteProduct(id);
            await fetchProducts();
        });
    };

    return {
        products,
        productById,
        page,
        perPage,
        loading,
        error,
        total,
        search,
        fetchProducts,
        initialized,
        fetchProductById,
        createProduct,
        updateProduct,
        deleteProduct,
    };
});