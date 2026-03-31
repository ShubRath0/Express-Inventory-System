import type { ApiResponse } from "@/api";
import type { PurchaseOrder } from "@/features/purchases/api/types/purchases.types";
import { api } from "@/lib";

export const getPurchaseOrders = async (): Promise<PurchaseOrder[]> => {
    try {
        const purchases = await api.get<ApiResponse<PurchaseOrder[]>>("/purchases");
        return purchases.data.data;
    } catch (err) {
        console.log("API ERROR: ", err);
        throw err;
    }
};