import type { ApiResponse } from "@/api";
import type { Product } from "@/features/products/api/types";
import { api } from "@/lib";


export const uploadCsv = async (file: File): Promise<Product[]> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
        const products = await api.post<ApiResponse<Product[]>>('/products/csv', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return products.data.data;
    } catch (err) {
        console.log("API ERROR: ", err);
        throw err;
    }
};