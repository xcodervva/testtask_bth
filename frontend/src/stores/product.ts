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
    const page = ref<Paginated<Product> | null>(null);
    const total = ref(0);

    const {
        loading,
        initialized,
        error,
        withLoader,
    } = useWithLoader(1000);

    const fetchProducts = useDebounceFn(
        async (page = 1) => {
            await withLoader(async () => {
                const { data } = await productApi.getProducts(page);
                console.log(data.meta);
                products.value = data.data;
                page = data.meta.current_page;
                total.value = data.meta.total;
            });
        },
        1000
    );

    const fetchProductById = useDebounceFn(async (id: number) => {
        await withLoader(async () => {
            const {data} = await productApi.getProductById(id);
            productById.value = data.data;
        });
        },
        1000
    );

    const createProduct = useDebounceFn(async (payload: ProductPayload) => {
            await withLoader(async () => {
                await productApi.createProduct(payload);
                await fetchProducts();
            });
        }, 1000
    );

    const updateProduct = useDebounceFn(async (id: number, payload: ProductPayload) => {
        await withLoader(async () => {
            await productApi.updateProduct(id, payload);
            await fetchProducts();
        });
        },
        1000
    );

    const deleteProduct = useDebounceFn(async (id: number) => {
        await withLoader(async () => {
            await productApi.deleteProduct(id);
            await fetchProducts();
        });
        }, 1000
    );

    return {
        products,
        productById,
        page,
        loading,
        error,
        total,
        fetchProducts,
        initialized,
        fetchProductById,
        createProduct,
        updateProduct,
        deleteProduct,
    };
});