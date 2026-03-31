import { useMemo } from "react";

export function useFilter<T>(
    items: T[],
    filters: Record<string, any[]>,
    filterFns: Record<string, (item: T, values: any[]) => boolean>
) {
    return useMemo(() => {
        const activeFilters = Object.entries(filters).filter(([, values]) => values.length > 0);

        if (!activeFilters.length) return items;

        return items.filter(item => {
            return activeFilters.every(([key, values]) => {
                const fn = filterFns[key];
                if (!fn) return true;
                return fn(item, values);
            });
        });
    }, [items, filters, filterFns]);
}