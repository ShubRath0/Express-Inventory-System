import type { PurchaseOrder } from "@/api/__generated__/types.schemas";
import { GenericTable, type ColumnDef } from "@/components";
import { setSortColumn, setSortDirection } from "@/features/products";
import { usePagination } from "@/hooks";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

export const statusColors: Record<string, string> = {
  PENDING:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",

  APPROVED:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",

  ORDERED:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",

  RECEIVED:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",

  CANCELLED:
    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
};

export const PurchaseOrderTable = () => {
  const dispatch = useDispatch();
  const data: PurchaseOrder[] = [
    { purchaseOrderId: 1, totalQuantity: 100, orderPrice: 1000, userId: 1, orderStatus: "APPROVED", purchaseDate: "04/14/2026" }
  ];


  const { items, page, totalPages, setPage } = usePagination<PurchaseOrder>({
    data,
    rowsPerPage: 10
  });


  const columns = useMemo<ColumnDef<PurchaseOrder>[]>(() => [
    {
      key: "purchaseId",
      label: "ID"
    },
    {
      key: "orderStatus",
      label: "Order Status",
      className: (item: PurchaseOrder) => statusColors[item.orderStatus!]
    },
    {
      key: "quantity",
      label: "Total Quantity"
    },
    {
      key: "orderPrice",
      label: "Total Price"
    },
    {
      key: "purchaseDate",
      label: "Purchase Date"
    },
  ], []);

  return (
    <GenericTable
      items={items}
      getRowId={(item) => item.purchaseOrderId!}
      columns={columns}
      sortColumn={"orderPrice"}
      sortDirection={"ascending"}
      setSortColumn={(col) => dispatch(setSortColumn(col))}
      setSortDirection={(dir) => dispatch(setSortDirection(dir))}
      page={page}
      pages={totalPages}
      onChange={(page) => setPage(page)}
    />
  );
};