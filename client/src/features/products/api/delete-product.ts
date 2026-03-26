import api from "@/lib/axios";
export const deleteProduct = async (id: number): Promise<void> => {
    try {
        await api.delete<void>(`/products/${id}`);
    } catch (err) {
        console.error("API ERROR:", err)
        throw err;
    }
}
