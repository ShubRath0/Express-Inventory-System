import type { RootState } from "@/app/Store";
import { GenericTable, type ColumnDef } from "@/components";
import type { PurchaseOrder } from "@/features/purchases/api";
import { useFilteredInventory } from "@/features/purchases/hooks/useFilteredInventory";
import { setSortColumn, setSortDirection } from "@/features/purchases/state";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export const PurchaseOrderTable = () => {
    const filteredPurchaseOrders = useFilteredInventory();
    const { sortColumn, sortDirection } = useSelector((state: RootState) => state.purchaseFilters);
    const dispatch = useDispatch();

    const columns: ColumnDef<PurchaseOrder>[] = useMemo<ColumnDef<PurchaseOrder>[]>(() => [
        {
            key: "purchaseId",
            label: "ID"
        },
        {
            key: "productName",
            label: "Product"
        },
        {
            key: "quantity",
            label: "Quantity"
        },
        {
            key: "unitPrice",
            label: "Unit Price",
            render: (v) => v?.toLocaleString(undefined, { style: 'currency', currency: 'USD' }),
        },
        {
            key: "totalCost",
            label: "Total Cost",
            render: (v) => v?.toLocaleString(undefined, { style: 'currency', currency: 'USD' }),
        },
        {
            key: "supplierName",
            label: "Supplier"
        },
    ], []);

    return (
        <GenericTable
            columns={columns}
            getRowKey={(item) => item.purchaseId}
            items={filteredPurchaseOrders}
            sortDirection={sortDirection}
            sortColumn={sortColumn}
            setSortColumn={(col) => dispatch(setSortColumn(col))}
            setSortDirection={(col) => dispatch(setSortDirection(col))}
        />
    );
};