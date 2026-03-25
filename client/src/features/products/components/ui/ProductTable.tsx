// IMPORTS
import { Button } from "@heroui/react"
import { Delete, PackageSearch } from "lucide-react"
import { useMemo } from "react"

import { GenericTable, type ColumnDef } from "@/components"
import type { Product } from "@/features/products/api"
import { DeleteAlert, UpdateStockModal } from "@/features/products/components"

// Hooks
import { useFilterContext } from "../../context/FilterProvider"
import { useModalContext } from "../../context/ModalProvider"

// MAIN FUNCTION
export const ProductTable = () => {
    // HOOKS
    const { openModal } = useModalContext();
    const { filteredProducts, sortColumn, setSortColumn, sortDirection, setSortDirection } = useFilterContext();

    const columns: ColumnDef<Product>[] = useMemo<ColumnDef<Product>[]>(() => [
        {
            key: "id",
            label: "ID"
        },
        {
            key: "name",
            label: "Product Name",
        },
        {
            key: "stock",
            label: "Stock",
            render: (value: string | number, item: Product) => {
                const isLow = item.stock < item.lowStockThreshold

                return (
                    <div className="flex justify-between font-bold">
                        <div>{value}</div>
                        <div>{isLow ? "LOW" : "GOOD"}</div>
                    </div>
                )
            },
            className: (item: Product) =>
                item.stock < item.lowStockThreshold
                    ? "low-stock"
                    : "high-stock"
        },
        {
            key: "price",
            label: "Unit Price",
            render: (value: string | number) =>
                `$${Number(value).toFixed(2)}`
        },
        {
            key: "actions",
            label: "Actions",
            virtual: true,
            allowSorting: false,
            renderVirtual: ((item: Product) => (
                <div className="flex items-center">
                    <div className="bg-card rounded-xl shadow-2xl">
                        <Button isIconOnly startContent={<PackageSearch />} variant="light" color="success" onPress={() => {
                            openModal('update', item)
                        }} />
                        <Button isIconOnly startContent={<Delete />} variant="light" color="danger" onPress={() => {
                            openModal('delete', item)
                        }} />
                    </div>
                </div>
            ))
        }
    ], [])

    return (
        <>
            <GenericTable
                items={filteredProducts || []}
                columns={columns}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                setSortColumn={setSortColumn}
                setSortDirection={setSortDirection}
                className="h-180"
            />
            <DeleteAlert />
            <UpdateStockModal />
        </>

    )
}