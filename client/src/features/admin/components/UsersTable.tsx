import type { UserDTO } from "@/api/__generated__/types.schemas";
import { usePagination } from "@/hooks";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { ColumnsList } from "../users/types/columns.types";

export const UsersTable = ({ data }: { data: UserDTO[] }) => {
  const { items, page, totalPages, setPage } = usePagination({
    data: data,
    rowsPerPage: 10,
  });

  return (
    <Table
      aria-label="Users & Roles table"
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
              onChange={setPage}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        {ColumnsList.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      {data?.length == 0 ? (
        <TableBody emptyContent="No users found.">{[]}</TableBody>
      ) : (
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{item[columnKey as keyof UserDTO]}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
};
