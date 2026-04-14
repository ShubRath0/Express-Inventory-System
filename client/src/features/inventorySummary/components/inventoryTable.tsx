import type { Product } from "@/api/__generated__/types.schemas";
import { ColumnsList } from "@/features/inventorySummary/api/types/columns.type";
import { usePagination } from "@/hooks/usePagination";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

export const InventoryTable = ({ data }: { data: Product[] }) => {
  const { items, page, totalPages, setPage } = usePagination({
    data: data,
    rowsPerPage: 10,
  });

  const formattedData = items?.map((item) => ({
    ...item,
    createdAt: item.createdAt
      ? new Date(item.createdAt).toLocaleDateString()
      : "",
    updatedAt: item.updatedAt
      ? new Date(item.updatedAt).toLocaleDateString()
      : "",
  }));


  return (
    <Table
      aria-label="Inventory summarytable"
      bottomContent={
        totalPages > 0 ? (
          <div className="flex justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={totalPages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader columns={ColumnsList}>
        {ColumnsList.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      {data?.length == 0 ? (
        <TableBody emptyContent="No products found.">{[]}</TableBody>
      ) : (
        <TableBody items={formattedData}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{item[columnKey as keyof typeof item]}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
};
