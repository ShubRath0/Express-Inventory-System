import type { RootState } from '@/app/Store';
import { usePurchaseOrders } from '@/features/purchases/hooks/usePurchaseOrders';
import { useSearchSort } from '@/hooks/useSearchSort';
import { useSelector } from 'react-redux';
import type { PurchaseOrder } from '../api';

export const useFilteredInventory = () => {
    const { purchaseOrders = [] } = usePurchaseOrders();
    const { searchTerm, sortColumn, sortDirection } = useSelector((state: RootState) => state.purchaseFilters);

    const finalDisplayList = useSearchSort<PurchaseOrder>({
        items: purchaseOrders,
        searchableKeys: ['purchaseId', 'productName'],
        sortColumn: sortColumn,
        sortDirection: sortDirection,
        query: searchTerm
    });

    return finalDisplayList;
};