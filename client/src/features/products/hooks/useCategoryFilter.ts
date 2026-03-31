import type { RootState } from "@/app/Store";
import { useFilter } from "@/hooks";
import { useSelector } from "react-redux";
import type { Product } from "../api";

export const useCategoryFilter = (products: Product[]) => {
    const { selectedCategories, selectedLevels } = useSelector((state: RootState) => state.filters);

    const filters = {
        category: selectedCategories,
        stock: selectedLevels,
    };

    const filterFns = {
        category: (item: Product, values: string[]) => {
            return values.some(v => v.toLowerCase() === item.category.toLowerCase());
        },
        stock: (item: Product, values: string[]) => {
            const isEmpty = item.stock === 0;
            const isLow = item.stock > 0 && item.stock < item.lowStockThreshold;
            const isGood = item.stock >= item.lowStockThreshold;

            return (
                (values.includes("Empty") && isEmpty) ||
                (values.includes("Low") && isLow) ||
                (values.includes("Good") && isGood)
            );
        },
    };


    return useFilter<Product>(products, filters, filterFns);
};