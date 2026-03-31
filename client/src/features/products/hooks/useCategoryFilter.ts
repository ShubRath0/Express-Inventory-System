import type { RootState } from "@/app/Store";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { Product } from "../api";

export const useCategoryFilter = (products: Product[]) => {
    const { selectedCategories } = useSelector((state: RootState) => state.filters);

    const filteredProducts = useMemo(() => {
        if (!selectedCategories || selectedCategories.length === 0 || selectedCategories.includes("all")) {
            return products;
        }

        const selectionArray = selectedCategories.map(s => s.toLowerCase());

        const hasStockFilter = selectionArray.some(s => ["low", "good", "empty"].includes(s));
        const hasCategoryFilter = selectionArray.some(s => !["low", "good", "empty"].includes(s));

        return products.filter((p) => {
            const isEmpty = p.stock === 0;
            const isLow = p.stock > 0 && p.stock < p.lowStockThreshold;
            const isGood = p.stock >= p.lowStockThreshold;

            const matchesStock = !hasStockFilter ||
                (selectionArray.includes("empty") && isEmpty) ||
                (selectionArray.includes("low") && isLow) ||
                (selectionArray.includes("good") && isGood);

            const matchesCategory = !hasCategoryFilter ||
                selectionArray.includes(p.category.toLowerCase());

            return matchesStock && matchesCategory;
        });
    }, [products, selectedCategories]);

    return filteredProducts;
};