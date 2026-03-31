import { getPurchaseOrders } from "@/features/purchases/api";
import { useQuery } from "@tanstack/react-query";

export const usePurchaseOrders = (keyword?: string) => {
    const query = useQuery({
        queryKey: ['purchaseOrders', keyword],
        queryFn: () => getPurchaseOrders(),
    });

    return {
        ...query,
        purchaseOrders: query.data ?? []
    };
};