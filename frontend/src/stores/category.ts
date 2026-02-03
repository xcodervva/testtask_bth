import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCategoryApi } from '@/composables/useCategoryApi';
import type { Category } from '@/types/product';

export const useCategoryStore = defineStore('categories', () => {
    const api = useCategoryApi();

    const categories = ref<Category[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const initialized = ref(false);

    const fetchCategories = async () => {
        if (initialized.value) return;

        loading.value = true;
        error.value = null;

        try {
            categories.value = await api.getCategories();
            initialized.value = true;
        } catch (e: any) {
            error.value = e.message ?? 'Failed to load categories';
            throw e;
        } finally {
            loading.value = false;
        }
    };

    return {
        categories,
        loading,
        error,
        fetchCategories,
    };
});