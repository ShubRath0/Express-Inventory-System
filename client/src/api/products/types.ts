export type Category = "PRODUCE" | "PLASTIC"

export interface Product {
    id: number
    name: string
    stock: number
    lowStockThreshold: number
    price: number
    category: Category
    createdAt: string,
    lastUpdated: string,
}

export interface PostProduct {
    name: string,
    category: Category,
    stock: number,
    lowStockThreshold: number,
    price: number,
}

export interface UpdateProduct {
    name?: string,
    category?: Category,
    stock?: number,
    lowStockThreshold?: number,
    price?: number,
}