import { getProducts } from "@api/products/api";
import type { Product } from "@api/products/types";
import { useEffect, useState } from "react";

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data.products);
            } catch (err) {
                console.log(err);
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [])

    return { products, loading, error };
}