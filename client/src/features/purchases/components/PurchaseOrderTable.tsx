import { useGetPurchaseOrders } from "@/api/__generated__/purchase-controller/purchase-controller";
import type { PurchaseOrderResponse } from "@/api/__generated__/types.schemas";
import { GenericTable, type ColumnDef } from "@/components";
import { setSortColumn, setSortDirection } from "@/features/products";
import { usePagination } from "@/hooks";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const statusColors: Record<string, string> = {
  PENDING:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",

  SHIPPED:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",

  ARRIVED:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",

  CANCELLED:
    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",

  RETURNED:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
};

export const PurchaseOrderTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useGetPurchaseOrders();

  const { items, page, totalPages, setPage } = usePagination<PurchaseOrderResponse>({
    data: data ?? [],
    rowsPerPage: 10
  });

  const columns = useMemo<ColumnDef<PurchaseOrderResponse>[]>(() => [
    {
      key: "id",
      label: "ID"
    },
    {
      key: "orderStatus",
      label: "Order Status",
      className: (item) => statusColors[item.orderStatus!]
    },
    {
      key: "totalQuantity",
      label: "Total Quantity"
    },
    {
      key: "orderPrice",
      label: "Total Price"
    },
    {
      key: "createdAt",
      label: "Purchase Date",
      render: (value) => {
        if (!value) return "-";

        return new Date(value as string).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    },
    {
      key: "Actions",
      virtual: true,
      allowSorting: false,
      renderVirtual: (item: PurchaseOrderResponse) => (
        <div className="flex items-center">
          <div className="bg-card rounded-xl shadow-2xl">
            <Button
              startContent={
                <div className="flex justify-center items-center gap-2">
                  View
                  <Eye />
                </div>
              }
              variant="light"
              color="success"
              onPress={() => {
                navigate(`/purchase-order/${item.id}`);
              }} />
          </div>
        </div>
      )
    }
  ], []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3, ease: "backInOut" }}
    >
      <GenericTable
        items={items}
        getRowId={(item: PurchaseOrderResponse) => item.id}
        columns={columns}
        sortColumn={"id"}
        sortDirection={"ascending"}
        setSortColumn={(col) => dispatch(setSortColumn(col))}
        setSortDirection={(dir) => dispatch(setSortDirection(dir))}
        page={page}
        pages={totalPages}
        onChange={(page) => setPage(page)}
      />

    </motion.div>

  );
};