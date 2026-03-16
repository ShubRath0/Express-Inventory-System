export type Status = "PENDING" | "DENIED" | "APPROVED"

export interface InventorySubmission {
    id: number
    status: Status,
    requestedBy: string,
    createdAt: string
}

export type InventorySubmissionItem = {
    id: number
    submissionId: number
    productId: number
    productStock: number
    countedQuantity: number
}