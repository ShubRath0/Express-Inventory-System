import api from "@/lib/axios";
import type { Product, UpdateStock } from '@/features/products/api/products.types';
import type { ApiResponse } from "@/api/api.types";

export const updateStock = async (request: UpdateStock): Promise<Product> => {
    console.log(request)
    try {
        const response = await api.patch<ApiResponse<Product>>(`/products/${request.id}`, request)
        console.log(response)
        return response.data.data;
    } catch (err) {
        console.error("API ERROR: ", err);
        throw err;
    }
}