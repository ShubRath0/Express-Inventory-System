import type { Category } from ".";

export interface CreateProductRequest {
    name: string,
    category: Category,
    stock: number,
    lowStockThreshold: number,
    price: number,
}

export interface ModifyStockRequest {
    id: number,
    stock: number
}

export interface SearchRequest {
    keyword: string
}