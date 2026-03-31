import { useMemo } from "react";

export type SortDirection = "ascending" | "descending";
type useSearchSortProps<T> = {
    items: T[],
    searchableKeys: (keyof T)[],
    query: string,
    sortColumn: keyof T,
    sortDirection: SortDirection;
};

export function useSearchSort<T extends Record<string, any>>({
    items,
    searchableKeys,
    query,
    sortColumn,
    sortDirection
}: useSearchSortProps<T>
) {

    const filteredItems = useMemo(() => {
        let result = [...items];

        if (query.trim() !== "") {
            const lowerQuery = query.toLowerCase();
            result = items.filter((item) =>
                searchableKeys.some((key => {
                    const value = item[key];
                    return value && String(value).toLowerCase().includes(lowerQuery);
                })));
        }

        if (sortColumn) {
            result.sort((a, b) => {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];

                if (aValue < bValue) return sortDirection == "ascending" ? -1 : 1;
                if (aValue > bValue) return sortDirection == "ascending" ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [items, sortColumn, sortDirection, searchableKeys]);

    return filteredItems;
}