import { useMemo, useState } from "react"

type SortDirection = "ascending" | "descending"
type useSearchSortProps<T> = {
    items: T[],
    searchableKeys: (keyof T)[]
}

export function useSearchSort<T extends Record<string, any>>({
    items,
    searchableKeys
}: useSearchSortProps<T>
) {
    const [search, setSearch] = useState("")
    const [sortColumn, setSortColumn] = useState<keyof T | undefined>(undefined)
    const [sortDirection, setSortDirection] = useState<SortDirection>("ascending")

    const filteredItems = useMemo(() => {
        let result = [...items]
        const lowercaseSearch = search.toLowerCase()

        if (lowercaseSearch !== "") {
            result = result.filter(item => searchableKeys.some((key) => String(item[key]).toLowerCase().includes(lowercaseSearch)))
        }

        if (sortColumn) {
            result.sort((a, b) => {
                const aValue = a[sortColumn]
                const bValue = b[sortColumn]

                if (aValue < bValue) return sortDirection == "ascending" ? -1 : 1
                if (aValue > bValue) return sortDirection == "ascending" ? 1 : -1
                return 0
            })
        }

        return result
    }, [items, search, sortColumn, sortDirection, searchableKeys])

    return {
        items: filteredItems,
        sortColumn,
        sortDirection,
        setSearch,
        setSortColumn,
        setSortDirection
    }
}