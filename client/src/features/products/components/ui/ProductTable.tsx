// IMPORTS
import { useMemo, useState } from "react"
import { Button, useDisclosure } from "@heroui/react"
import { Delete, Minus, Plus } from "lucide-react"

import { type ColumnDef, GenericTable } from "@/components"
import type { Product } from "@/features/products/api/products.types"
import { DeleteAlert, UpdateStockModal, type UpdateStockFormData } from "@/features/products/components"

// Hooks
import { useToast } from "@/hooks/useToast"
import { useDeleteProduct, useUpdateProduct } from "@/features/products/hooks/useProducts"

// TYPES
export type ProductTableProps = {
    products: Product[],
    sortColumn?: keyof Product,
    sortDirection: "ascending" | "descending",
    setSortColumn: React.Dispatch<React.SetStateAction<keyof Product | undefined>>
    setSortDirection: React.Dispatch<React.SetStateAction<"ascending" | "descending">>
}

type ActionType = "delete" | "update" | null;

// MAIN FUNCTION
export const ProductTable = ({ products, sortColumn, sortDirection, setSortColumn, setSortDirection }: ProductTableProps) => {
    // HOOKS
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [action, setAction] = useState<ActionType>()
    const toast = useToast()

    // MUTATIONS
    const deleteMutation = useDeleteProduct();
    const updateMutation = useUpdateProduct();

    // FUNCTIONS
    function deleteProduct() {
        if (selectedProduct) {
            toast.promise(deleteMutation.mutateAsync(selectedProduct.id), {
                loading: "Deleting product...",
                success: "Product deleted!",
                error: "Product could not be deleted."
            })
        }
    }

    function updateProduct(data: UpdateStockFormData) {
        const newData: UpdateStockFormData = { ...data, id: selectedProduct!.id }
        toast.promise(updateMutation.mutateAsync(newData), {
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
            key: "category",
            label: "Category"
        },
        {
            key: "actions",
            label: "Actions",
            virtual: true,
            allowSorting: false,
            renderVirtual: (item => (
                <div>

                    <Button isIconOnly startContent={<Plus />} variant="light" color="success" onPress={() => {
                        setSelectedProduct(item)
                        setAction("update")
                        onOpen()
                    }} />

                    <Button isIconOnly startContent={<Minus />} variant="light" color="danger" onPress={() => {
                        setSelectedProduct(item)
                        setAction("update")
                        onOpen()
                    }} />
                    <Button isIconOnly startContent={<Delete />} variant="light" color="danger" onPress={() => {
                        setSelectedProduct(item)
                        setAction("delete")
                    }} />

                </div>
            ))
        }
    ], [])

    return (
        <>
            <GenericTable
                items={products}
                columns={columns}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                setSortColumn={setSortColumn}
                setSortDirection={setSortDirection}
            />
            <DeleteAlert
                handleDelete={deleteProduct}
                isOpen={action == 'delete' && selectedProduct != null}
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedProduct(null)
                        setAction(null)
                    }
                }}
            />
            <UpdateStockModal isOpen={isOpen} onOpenChange={onOpenChange} onSubmit={updateProduct} />
        </>

    )
}