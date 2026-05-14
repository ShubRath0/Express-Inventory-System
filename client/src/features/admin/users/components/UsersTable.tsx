import type {
  ApiResponseListUserDTO,
  UserDTORole,
} from "@/api/__generated__/types.schemas";
import { Loading } from "@/components";
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
import { ColumnsList } from "../types/columns.types";

export const UsersTable = ({
  selectedRole,
  data,
  isLoading,
  isError,
}: {
  selectedRole?: UserDTORole;
  data: ApiResponseListUserDTO | undefined;
  isLoading: boolean;
  isError: boolean;
}) => {
  const filteredUserRoles = (data?.data || []).filter(
    (item) => !selectedRole || item.role === selectedRole,
  );

  const { items, page, totalPages, setPage } = usePagination({
    data: filteredUserRoles,
    rowsPerPage: 10,
  });

  if (isLoading) {
    return <Loading label="Loading users..." />;
  }

  if (isError) {
    return <div>Failed to load users</div>;
  }

  return (
    <Table
      aria-label="Users & Roles table"
      bottomContent={
        totalPages > 0 ? (
          <div className="flex justify-center">
            <Pagination
              isCompact
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
      {data?.data?.length == 0 ? (
        <TableBody emptyContent="No users found.">{[]}</TableBody>
      ) : (
        <TableBody items={items}>
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
