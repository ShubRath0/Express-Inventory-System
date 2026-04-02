import { ColumnsList } from "@/features/inventorySummary/api/types/columns.type";
import { RowsList } from "@/features/inventorySummary/api/types/rows.type";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

export const InventoryTable = () => {
  return (
    <Table>
      <TableHeader columns={ColumnsList}>
        {ColumnsList.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      {RowsList.length == 0 ? 
      <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        :
        <TableBody items={RowsList}>
          {RowsList.map((row) => (
            <TableRow key={row.key}>
              {(columnKey) => <TableCell>{ getKeyValue(row, columnKey)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
    }
    </Table>
  );
};
