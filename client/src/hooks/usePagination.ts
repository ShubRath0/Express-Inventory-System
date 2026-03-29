import { useEffect, useMemo, useState } from "react";

interface usePaginationProps<T> {
    data: T[],
    rowsPerPage: number,
}

export const usePagination = <T>({
    data,
    rowsPerPage
}: usePaginationProps<T>) => {
    const [page, setPage] = useState<number>(1);

    const safeRowsPerPage = Math.max(1, rowsPerPage);
    const totalPages = Math.ceil((data?.length || 0) / safeRowsPerPage);

    useEffect(() => {
        if (page > totalPages && totalPages > 0) {
            setPage(totalPages);
        }
    }, [data.length, totalPages, page]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return data.slice(start, end);
    }, [data, page, rowsPerPage]);

    return {
        items,
        page,
        totalPages,
        setPage,
        hasNext: page < totalPages,
        hasPrev: page > 1
    };
};