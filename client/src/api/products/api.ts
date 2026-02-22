import api from "@/api/axios";
import type { GetProductsResponse } from '@api/products/types';

// REAL API (commented out until backend is ready)
// export const getProducts = async (): Promise<GetProductsResponse> => {
//     try {
//         const response = await api.get<GetProductsResponse>("/products");
//         return response.data;
//     } catch (err) {
//         console.error("API ERROR:", err);
//         return { products: [] };
//     }
// }


// Since our backend products API isn't done yet, we will use dummy data for now , i will leave the actual code above commented out
// I added a fake 3 second wait period to mimic the real API call
export const getProducts = async (): Promise<GetProductsResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                products: [
                    {
                        id: 1,
                        name: "Apple",
                        startingStock: 100,
                        incomingStock: 50,
                        endingStock: 150,
                        weeklyUsage: 40,
                        supplier: "Local Farm",
                        price: 0.99,
                        category: "Produce",
                        creationDate: "2026-02-21T13:00:00Z",
                        lastUpdated: "2026-02-21T14:00:00Z",
                    },
                    {
                        id: 2,
                        name: "Plastic Bag",
                        startingStock: 200,
                        incomingStock: 100,
                        endingStock: 300,
                        weeklyUsage: 50,
                        supplier: "Packaging Co.",
                        price: 0.05,
                        category: "Plastic",
                        creationDate: "2026-02-21T10:00:00Z",
                        lastUpdated: "2026-02-21T11:00:00Z",
                    },
                    {
                        id: 3,
                        name: "Banana",
                        startingStock: 120,
                        incomingStock: 80,
                        endingStock: 200,
                        weeklyUsage: 60,
                        supplier: "Tropical Farms",
                        price: 0.79,
                        category: "Produce",
                        creationDate: "2026-02-20T09:00:00Z",
                        lastUpdated: "2026-02-20T10:30:00Z",
                    },
                    {
                        id: 4,
                        name: "Plastic Bottle",
                        startingStock: 500,
                        incomingStock: 200,
                        endingStock: 700,
                        weeklyUsage: 150,
                        supplier: "Packaging Co.",
                        price: 0.15,
                        category: "Plastic",
                        creationDate: "2026-02-19T08:00:00Z",
                        lastUpdated: "2026-02-19T09:00:00Z",
                    },
                    {
                        id: 5,
                        name: "Carrot",
                        startingStock: 80,
                        incomingStock: 40,
                        endingStock: 120,
                        weeklyUsage: 30,
                        supplier: "Local Farm",
                        price: 0.49,
                        category: "Produce",
                        creationDate: "2026-02-18T07:30:00Z",
                        lastUpdated: "2026-02-18T08:15:00Z",
                    },
                    {
                        id: 6,
                        name: "Plastic Fork",
                        startingStock: 300,
                        incomingStock: 100,
                        endingStock: 400,
                        weeklyUsage: 80,
                        supplier: "Packaging Co.",
                        price: 0.03,
                        category: "Plastic",
                        creationDate: "2026-02-17T12:00:00Z",
                        lastUpdated: "2026-02-17T13:00:00Z",
                    },
                    {
                        id: 7,
                        name: "Orange",
                        startingStock: 90,
                        incomingStock: 60,
                        endingStock: 150,
                        weeklyUsage: 50,
                        supplier: "Citrus Farm",
                        price: 0.89,
                        category: "Produce",
                        creationDate: "2026-02-16T14:00:00Z",
                        lastUpdated: "2026-02-16T15:00:00Z",
                    },
                    {
                        id: 8,
                        name: "Plastic Straw",
                        startingStock: 400,
                        incomingStock: 150,
                        endingStock: 550,
                        weeklyUsage: 100,
                        supplier: "Packaging Co.",
                        price: 0.02,
                        category: "Plastic",
                        creationDate: "2026-02-15T11:00:00Z",
                        lastUpdated: "2026-02-15T12:00:00Z",
                    },
                    {
                        id: 9,
                        name: "Lettuce",
                        startingStock: 60,
                        incomingStock: 30,
                        endingStock: 90,
                        weeklyUsage: 25,
                        supplier: "Local Farm",
                        price: 1.29,
                        category: "Produce",
                        creationDate: "2026-02-14T10:00:00Z",
                        lastUpdated: "2026-02-14T11:00:00Z",
                    },
                    {
                        id: 10,
                        name: "Plastic Container",
                        startingStock: 150,
                        incomingStock: 50,
                        endingStock: 200,
                        weeklyUsage: 40,
                        supplier: "Packaging Co.",
                        price: 0.50,
                        category: "Plastic",
                        creationDate: "2026-02-13T09:30:00Z",
                        lastUpdated: "2026-02-13T10:30:00Z",
                    },
                ],
            })
        }, 3000)
    })
};