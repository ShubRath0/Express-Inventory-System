import { api } from "@/lib";

export const deleteEverything = async (): Promise<void> => {
    try {
        await api.delete<void>(`/products/DELETE_EVERY_SINGLE_PRODUCT`);
    } catch (err) {
        console.error("API ERROR:", err);
        throw err;
    }
};
