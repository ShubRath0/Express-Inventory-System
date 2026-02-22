export type Category = "Produce" | "Plastic"

export interface Product {
    id: number
    name: string
    startingStock: number
    incomingStock: number
    endingStock: number
    weeklyUsage: number
    supplier: string
    price: number
    category: Category
    creationDate: string,
    lastUpdated: string,
}

export interface GetProductsResponse {
    products: Product[]
} 