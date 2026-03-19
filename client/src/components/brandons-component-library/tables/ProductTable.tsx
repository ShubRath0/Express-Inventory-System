import type { Product } from "@/api/products/types"
import { GenericTable } from "@components/brandons-component-library/tables/GenericTable"
import { useMemo, useState } from "react"
import type { ColumnDef } from "@/components/brandons-component-library/tables/GenericTable"
import { Button, useDisclosure } from "@heroui/react"
import { Delete, Minus, Plus } from "lucide-react"
import { useDeleteProduct } from "@/hooks/useProducts"
import { DeleteAlert } from "@/components/brandons-component-library/alerts/DeleteAlert"
import { useToast } from "@/hooks/useToast"
import { AddProductModal } from "../modals/AddProductModal"

export type ProductTableProps = {
    products: Product[],
    sortColumn?: keyof Product,
    sortDirection: "ascending" | "descending",
    setSortColumn: React.Dispatch<React.SetStateAction<keyof Product | undefined>>
    setSortDirection: React.Dispatch<React.SetStateAction<"ascending" | "descending">>
}

export const ProductTable = ({ products, sortColumn, sortDirection, setSortColumn, setSortDirection }: ProductTableProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [productToDelete, setProductToDelete] = useState<Product | null>(null)
    const deleteMutation = useDeleteProduct();
    const toast = useToast()

    function deleteProduct() {
        if (productToDelete) {
            toast.promise(deleteMutation.mutateAsync(productToDelete.id), {
                loading: "Deleting product...",
                success: "Product deleted!",
                error: "Product could not be deleted."
            })
        }
    }

    function updateProduct() {
        console.log("HI")
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
                    <Button isIconOnly startContent={<Plus />} variant="light" color="success" onPress={onOpen} />
                    <Button isIconOnly startContent={<Minus />} variant="light" color="danger" onPress={() => console.log("HI")} />
                    <Button isIconOnly startContent={<Delete />} variant="light" color="danger" onPress={() => setProductToDelete(item)} />
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
                isOpen={!!productToDelete}
                onOpenChange={(open) => !open && setProductToDelete(null)}
            />
            <AddProductModal isOpen={isOpen} onOpenChange={onOpenChange} onSubmit={updateProduct} />
        </>

    )
}