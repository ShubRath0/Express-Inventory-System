import type { SharedSelection } from "@heroui/react";
import { useMemo, useState } from "react";
import type { Product } from "../api";

export const useFilter = (products: Product[]) => {
    const [selectedCategories, setSelectedCategories] = useState<SharedSelection>(new Set(["produce", "plastic"]));

    const filteredProducts = useMemo(() => {
        if (!selectedCategories || selectedCategories === "all") {
            return products;
        }
        const selectionArray = Array.from(selectedCategories);
        return products.filter((p) => {
            const matchesCategory = selectionArray.includes(p.category.toLocaleLowerCase());

            const isLowStock = p.stock < p.lowStockThreshold
            const isGoodStock = p.stock >= p.lowStockThreshold

            const filterIncludesLow = selectionArray.includes("low")
            const filterIncludesGood = selectionArray.includes("good")

            let matchesStock = true;
            if (filterIncludesLow || filterIncludesGood) {
                matchesStock = (filterIncludesLow && isLowStock) || (filterIncludesGood && isGoodStock);
            }
            return matchesCategory && matchesStock;
        });
    }, [products, selectedCategories]);

    return { filteredProducts, selectedCategories, setSelectedCategories }
}