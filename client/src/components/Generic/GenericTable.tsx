import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import { useMemo } from "react"

export type ColumnDef<T> = {
    key: keyof T | string
    virtual?: boolean
    renderVirtual?: (item: T) => React.ReactNode
    label?: string
    allowSorting?: boolean
    render?: (value: T[keyof T], item: T) => React.ReactNode
    className?: (item: T) => string
    editFn?: (item: T) => void
    sortAccessor?: (item: T) => string | number
}

export type GenericTableProps<T extends { id: string | number }> = {
    items: T[],
    columns: ColumnDef<T>[],
    className?: string,
    sortColumn?: keyof T,
    sortDirection: "ascending" | "descending"
    setSortColumn: (column: keyof T | undefined) => void;
    setSortDirection: (direction: "ascending" | "descending") => void;
}

export const GenericTable = <T extends { id: string | number }>({
    items,
    columns,
    className,
    sortColumn,
    sortDirection,
    setSortColumn,
    setSortDirection,
}: GenericTableProps<T>) => {
    const sortedItems = useMemo(() => {
        if (!sortColumn) return items

        const column = columns.find(c => String(c.key) === String(sortColumn))
        if (!column) return items

        const dir = sortDirection === "ascending" ? 1 : -1

        return [...items].sort((a, b) => {
            const aVal = column.sortAccessor ? column.sortAccessor(a) : a[sortColumn as keyof T]
            const bVal = column.sortAccessor ? column.sortAccessor(b) : b[sortColumn as keyof T]

            if (aVal < bVal) return -1 * dir
            if (aVal > bVal) return 1 * dir
            return 0
        })
    }, [items, sortColumn, sortDirection, columns])
    return (
        <Table
            aria-label="Data Table"
            sortDescriptor={sortColumn
                ? { column: String(sortColumn), direction: sortDirection }
                : undefined}
            onSortChange={(descriptor) => {
                setSortColumn(descriptor.column as keyof T)
                setSortDirection(descriptor.direction as "ascending" | "descending")
            }}
            className={className}
        >

            {/* COLUMNS */}
            <TableHeader columns={columns}>
                {(col) => (
                    <TableColumn key={String(col.key)} allowsSorting={col.allowSorting ?? true}>
                        {col.label ?? String(col.key)}
                    </TableColumn>
                )}
            </TableHeader>

            {/* BODY */}
            <TableBody items={sortedItems} emptyContent="No data found">
                {(item) => (
                    <TableRow key={item.id}>
                        {columns.map((col) => {

                            if (col.virtual) {
                                return (
                                    <TableCell key={String(col.key)} className={col.className?.(item)}>
                                        {col.renderVirtual?.(item)}
                                    </TableCell>
                                )
                            }
                            const value = item[col.key as keyof T]

                            return (
                                <TableCell
                                    key={String(col.key)}
                                    className={col.className?.(item)}
                                >
                                    {col.render ? col.render(value, item) : String(value)}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                )}
            </TableBody>
        </Table >
    )
}