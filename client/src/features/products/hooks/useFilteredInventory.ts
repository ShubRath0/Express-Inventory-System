import type { RootState } from '@/app/Store';
import { useSearchSort } from '@/hooks/useSearchSort';
import { useSelector } from 'react-redux';
import { useCategoryFilter } from '.';
import type { Product } from '../api';
import { useProducts } from "./useProducts";

export const useFilteredInventory = () => {
    const { products = [] } = useProducts();
    const { searchTerm, sortColumn, sortDirection } = useSelector((state: RootState) => state.filters)

    const categoryFiltered = useCategoryFilter(products);

    const finalDisplayList = useSearchSort<Product>({
        items: categoryFiltered,
        searchableKeys: ['id', 'name'],
        sortColumn: sortColumn,
        sortDirection: sortDirection,
        query: searchTerm
    });

    return finalDisplayList;
}