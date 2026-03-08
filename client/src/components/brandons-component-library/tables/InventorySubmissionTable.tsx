import { Button } from "@heroui/react"
import { GenericTable, type ColumnDef } from "./GenericTable"
import type { InventorySubmission } from "@/api/requests/types"
import { View } from "lucide-react"

export type RequestChangeTableProps = {
    inventorySubmissions: InventorySubmission[]
    sortColumn?: keyof InventorySubmission,
    sortDirection: "ascending" | "descending",
    setSortColumn: React.Dispatch<React.SetStateAction<keyof InventorySubmission | undefined>>
    setSortDirection: React.Dispatch<React.SetStateAction<"ascending" | "descending">>
    onPress: (item: InventorySubmission) => void
}

export const InventorySubmissionTable = ({
    inventorySubmissions,
    sortColumn,
    sortDirection,
    setSortColumn,
    setSortDirection,
    onPress
}: RequestChangeTableProps) => {

    const columns: ColumnDef<InventorySubmission>[] = [
        {
            key: "id",
            label: "ID"
        },
        {
            key: "createdAt",
            label: "Date"
        },
        {
            key: "status",
            label: "Status",
            className: (inventorySubmission) => (`status-badge-${inventorySubmission.status.toLowerCase()}`)
        },
        {
            key: "requestedBy",
            label: "Requested By"
        },
        {
            key: "actions",
            label: "Actions",
            virtual: true,
            renderVirtual: ((item) => (<Button isIconOnly variant="light" startContent={<View />} color="primary" onPress={() => onPress(item)} />))
        }
    ]

    return (
        <GenericTable
            items={inventorySubmissions}
            columns={columns}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            setSortColumn={setSortColumn}
            setSortDirection={setSortDirection}
        />
    )
}