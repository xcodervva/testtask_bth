import api from '@/lib/axios';
import type { Product, Paginated, ProductPayload } from '@/types/product';

export function useProductApi() {
    const getProducts = async (page = 1) => {
        const { data } = await api.get<Paginated<Product>>(
            `/products?page=${page}`
        );

        return data;
    }

    const getProduct = async (id: number) => {
        const { data } = await api.get<Product>(`/products/${id}`);

        return data;
    }

    const createProduct = async (payload: ProductPayload) => {
        await api.post('/products', payload);
    }

    const updateProduct = async (id: number, payload: ProductPayload) => {
        await api.put(`/products/${id}`, payload);
    }

    const deleteProduct = async (id: number) => {
        await api.delete(`/products/${id}`);
    }

    return {
        getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
    };
}