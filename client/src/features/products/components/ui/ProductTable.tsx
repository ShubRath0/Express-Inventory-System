// IMPORTS
import { useMemo } from "react"
import { Button, useDisclosure } from "@heroui/react"
import { Delete, PackageSearch } from "lucide-react"

import { type ColumnDef, GenericTable } from "@/components"
import type { Product } from "@/features/products/api/products.types"
import { DeleteAlert, UpdateStockModal, type UpdateStockFormData } from "@/features/products/components"

// Hooks
import { useToast } from "@/hooks/useToast"
import { useDeleteProduct, useUpdateStock } from "@/features/products/hooks/useProducts"
import { useInventory } from "../../context"

// MAIN FUNCTION
export const ProductTable = () => {
    // HOOKS
    const { selectedProduct, setSelectedProduct, filteredProducts, sortColumn, setSortColumn, sortDirection, setSortDirection, setActiveModal } = useInventory();
    const toast = useToast()

    // MUTATIONS
    const deleteMutation = useDeleteProduct();
    const updateMutation = useUpdateStock();

    // FUNCTIONS
    function deleteProduct() {
        if (!selectedProduct) return;
        toast.promise(deleteMutation.mutateAsync(selectedProduct.id), {
            loading: "Deleting product...",
            success: "Product deleted!",
            error: "Product could not be deleted."
        })
    }

    function updateStock(data: UpdateStockFormData) {
        toast.promise(updateMutation.mutateAsync(data), {
            loading: "Updating product...",
            success: "Product updated!",
            error: "Product could not be updated."
        })
    }

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
            renderVirtual: (item => (
                <div className="flex items-center">
                    <div className="bg-card rounded-xl shadow-2xl">
                        <Button isIconOnly startContent={<PackageSearch />} variant="light" color="success" onPress={() => {
                            setSelectedProduct(item)
                            setActiveModal('update')
                        }} />
                        <Button isIconOnly startContent={<Delete />} variant="light" color="danger" onPress={() => {
                            setSelectedProduct(item)
                            setActiveModal('delete')
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
            <DeleteAlert handleDelete={deleteProduct} />
            <UpdateStockModal onSubmit={updateStock} />
        </>

    )
}