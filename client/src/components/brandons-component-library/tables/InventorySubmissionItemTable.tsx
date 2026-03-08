import { GenericTable, type ColumnDef } from "./GenericTable"
import type { InventorySubmissionItem } from "@/api/requests/types"
import { useMemo } from "react"
import type { Product } from "@/api/products/types"

export type RequestChangeTableProps = {
    inventorySubmissionItems: InventorySubmissionItem[]
    products: Product[]
    sortColumn?: keyof InventorySubmissionItem,
    sortDirection: "ascending" | "descending",
    setSortColumn: React.Dispatch<React.SetStateAction<keyof InventorySubmissionItem | undefined>>
    setSortDirection: React.Dispatch<React.SetStateAction<"ascending" | "descending">>
}

export const InventorySubmissionItemTable = ({
    inventorySubmissionItems,
    products,
    sortColumn,
    sortDirection,
    setSortColumn,
    setSortDirection,
}: RequestChangeTableProps) => {

    const productMap = useMemo(
        () => new Map(products.map(p => [p.id, p])),
        [products]
    )
    const columns: ColumnDef<InventorySubmissionItem>[] = [
        {
            key: "productId",
            label: "Product ID",
        },
        {
            key: "name",
            label: "Product Name",
            virtual: true,
            renderVirtual: (item) => {
                const product = productMap.get(item.productId)
                return <span>{product?.name ?? "Unknown Product"}</span>
            },
            sortAccessor: (item) => {
                const product = productMap.get(item.productId)
                return product?.name || ""
            }
        },
        {
            key: "productStock",
            label: "Beginning Stock"
        },
        {
            key: "countedQuantity",
            label: "Ending Stock"
        },
        {
            key: "change",
            label: "Differece",
            virtual: true,
            renderVirtual: (item) => {
                const change = item.productStock - item.countedQuantity
                const symbol = change < 0 ? "+" : "-"
                return <p className="font-bold">{symbol}{Math.abs(change)}</p>
            },
            className: (item) => {
                const change = item.productStock - item.countedQuantity
                return change > 0 ? "low-stock" : "high-stock"
            },
            sortAccessor: (item) => item.productStock - item.countedQuantity
        }
    ]

    return (
        <GenericTable
            items={inventorySubmissionItems}
            columns={columns}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            setSortColumn={setSortColumn}
            setSortDirection={setSortDirection}
        />
    )
}