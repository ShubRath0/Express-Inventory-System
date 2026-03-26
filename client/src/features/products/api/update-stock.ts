import type { ApiResponse } from "@/api/api.types";
import type { ModifyStockRequest, Product } from '@/features/products/api';
import api from "@/lib/axios";

export const updateStock = async (request: ModifyStockRequest): Promise<Product> => {
    try {
        const response = await api.patch<ApiResponse<Product>>(`/products/${request.id}`, request)
        return response.data.data;
    } catch (err) {
        console.error("API ERROR: ", err);
        throw err;
    }
}