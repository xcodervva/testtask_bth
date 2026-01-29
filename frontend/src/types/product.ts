export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    description: string | null;
    price: number;
    category: Category;
}

export interface ProductPayload {
    name: string;
    description?: string | null;
    price: number;
    category_id: number;
}

export interface Paginated<T> {
    data: T[];
    meta: {
        current_page: number,
        last_page: number,
        per_page: number,
        total: number,
    }
}
