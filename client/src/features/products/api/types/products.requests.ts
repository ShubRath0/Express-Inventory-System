import type { Category } from "@/features/products/api";

export interface CreateProductRequest {
    name: string,
    category: Category,
    stock: number,
    lowStockThreshold: number,
    price: number,
}

export interface ModifyStockRequest {
    id: number,
    stock: number,
    reason: string,
}

export interface SearchRequest {
    keyword: string;
}