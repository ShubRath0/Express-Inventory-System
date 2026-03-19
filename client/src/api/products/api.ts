import api from "@/api/axios";
import type { PostProduct, Product, UpdateProduct } from '@api/products/types';

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get<Product[]>("/products");
        return response.data;
    } catch (err) {
        console.error("API ERROR:", err);
        throw err;
    }
}

export const createProduct = async (request: PostProduct): Promise<Product> => {
    try {
        const response = await api.post<Product>("/products", request)
        return response.data
    } catch (err) {
        console.error("API ERROR:", err);
        throw err;
    }
}

export const updateProduct = async (id: number, request: UpdateProduct): Promise<Product> => {
    try {
        const response = await api.patch<Product>(`/products/${id}`, request);
        return response.data;
    } catch (err) {
        console.error("API ERROR:", err);
        throw err;
    }
}

export const deleteProduct = async (id: number): Promise<void> => {
    try {
        await api.delete<void>(`/products/${id}`);
    } catch (err) {
        console.error("API ERROR:", err)
        throw err;
    }
}
