import { getInventorySubmissionItems, getInventorySubmissions } from "@/api/requests/api"
import type { InventorySubmission, InventorySubmissionItem } from "@/api/requests/types";
import { useQuery } from "@tanstack/react-query"

export const useInventorySubmissions = () => {
    const query = useQuery<InventorySubmission[]>({
        queryKey: ["inventorySubmissions"],
        queryFn: getInventorySubmissions
    });

    return {
        ...query,
        inventorySubmissions: query.data ?? []
    }
}

export const useInventorySubmissionItems = () => {
    const query = useQuery<InventorySubmissionItem[]>({
        queryKey: ["inventorySubmissionItems"],
        queryFn: getInventorySubmissionItems
    })

    return {
        ...query,
        inventorySubmissionItems: query.data ?? []
    }
}