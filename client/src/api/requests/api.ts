import type { InventorySubmission, InventorySubmissionItem } from "./types"

export const getInventorySubmissions = async (): Promise<InventorySubmission[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    createdAt: "02-28-2026",
                    requestedBy: "Bob",
                    status: "PENDING"
                },
                {
                    id: 2,
                    createdAt: "01-27-2026",
                    requestedBy: "Greg",
                    status: "APPROVED"
                },
                {
                    id: 3,
                    createdAt: "01-05-2026",
                    requestedBy: "Sid",
                    status: "DENIED"
                },
            ])
        }, 900)
    })
}

export const getInventorySubmissionItems = async (): Promise<InventorySubmissionItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                // 🔹 Submission 1
                {
                    id: 1,
                    submissionId: 1,
                    productId: 30,
                    productStock: 42,
                    countedQuantity: 30,
                },
                {
                    id: 2,
                    submissionId: 1,
                    productId: 31,
                    productStock: 50,
                    countedQuantity: 45,
                },
                {
                    id: 3,
                    submissionId: 1,
                    productId: 33,
                    productStock: 20,
                    countedQuantity: 17,
                },

                // 🔹 Submission 2
                {
                    id: 4,
                    submissionId: 2,
                    productId: 30,
                    productStock: 42,
                    countedQuantity: 40,
                },
                {
                    id: 5,
                    submissionId: 2,
                    productId: 31,
                    productStock: 50,
                    countedQuantity: 52,
                },
                {
                    id: 6,
                    submissionId: 2,
                    productId: 33,
                    productStock: 20,
                    countedQuantity: 19,
                },

                // 🔹 Submission 3
                {
                    id: 7,
                    submissionId: 3,
                    productId: 30,
                    productStock: 42,
                    countedQuantity: 41,
                },
                {
                    id: 8,
                    submissionId: 3,
                    productId: 31,
                    productStock: 50,
                    countedQuantity: 48,
                },
                {
                    id: 9,
                    submissionId: 3,
                    productId: 33,
                    productStock: 20,
                    countedQuantity: 22,
                },
            ])
        }, 900)
    })
}