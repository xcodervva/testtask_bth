import api from '@/lib/axios';
import type { Category } from '@/types/product';

export function useCategoryApi() {
    const getCategories = async () => {
        const { data: { data } } = await api.get<Category[]>('/categories');

        return data;
    }

    return { getCategories };
}