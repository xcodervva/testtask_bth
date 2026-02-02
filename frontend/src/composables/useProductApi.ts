import api from '@/lib/axios';
import type { Product, Paginated, ProductPayload } from '@/types/product';

export function useProductApi() {
    const getProducts = async (page = 1) => {
        const response = await api.get<Paginated<Product>>(
            `/products?page=${page}`
        );

        return response;
    }

    const getProductById = async (id: number) => {
        const response = await api.get<Product>(`/products/${id}`);

        return response;
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
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
    };
}