import type { RootState } from "@/app/Store";
import { type ColumnDef, GenericTable } from "@/components";
import type { Product } from "@/features/products/api";
import { useFilteredInventory, useModalActions } from "@/features/products/hooks";
import { setSortColumn, setSortDirection } from "@/features/products/state";
import { usePagination } from "@/hooks";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Delete, PackageSearch } from "lucide-react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// MAIN FUNCTION
export const ProductTable = () => {
  // HOOKS
  const { openModal } = useModalActions();

  const dispatch = useDispatch();
  const filteredProducts = useFilteredInventory();
  const { sortColumn, sortDirection } = useSelector((state: RootState) => state.filters);

  const { items, page, totalPages, setPage } = usePagination<Product>({
    data: filteredProducts,
    rowsPerPage: 10
  });

  const columns: ColumnDef<Product>[] = useMemo<ColumnDef<Product>[]>(() => [
    {
      key: "id",
      label: "ID"
    },
    {
      key: "name",
      label: "Product Name",
    },
    {
      key: "stock",
      label: "Stock",
      render: (value: string | number, item: Product) => {
        const isLow = item.stock < item.lowStockThreshold;

        return (
          <div className="flex justify-between font-bold">
            <div>{value}</div>
            <div>{isLow ? "LOW" : "GOOD"}</div>
          </div>
        );
      },
      className: (item: Product) =>
        item.stock < item.lowStockThreshold
          ? "low-stock"
          : "high-stock"
    },
    {
      key: "price",
      label: "Unit Price",
      render: (value: string | number) =>
        `$${Number(value).toFixed(2)}`
    },
    {
      key: "actions",
      label: "Actions",
      virtual: true,
      allowSorting: false,
      renderVirtual: ((item: Product) => (
        <div className="flex items-center">
          <div className="bg-card rounded-xl shadow-2xl">
            <Button isIconOnly startContent={<PackageSearch />} variant="light" color="success" onPress={() => {
              openModal('update', item);
            }} />
            <Button isIconOnly startContent={<Delete />} variant="light" color="danger" onPress={() => {
              openModal('delete', item);
            }} />
          </div>
        </div>
      ))
    }
  ], []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3, ease: "backInOut" }}
    >
      <GenericTable
        items={items || []}
        columns={columns}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        setSortColumn={(col) => dispatch(setSortColumn(col))}
        setSortDirection={(dir) => dispatch(setSortDirection(dir))}
        page={page}
        pages={totalPages}
        onChange={(page) => setPage(page)}
        className="h-180"
        getRowId={(item) => item.id}
      />
    </motion.div>
  );
};