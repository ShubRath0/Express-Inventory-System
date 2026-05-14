import { getGetPurchaseOrderQueryKey, useGetPurchaseOrder, useUpdatePurchaseOrderStatus } from "@/api/__generated__/purchase-controller/purchase-controller";
import { UpdateStatusRequestStatus, type PurchaseOrderRecordDTO } from "@/api/__generated__/types.schemas";
import { GenericTable, Header, ScrollContainer, SectionContainer, StatCard, type ColumnDef } from "@/components";
import { setSortColumn, setSortDirection } from "@/features/products";
import { useAppDispatch } from "@/features/products/hooks/hooks";
import { statusColors } from "@/features/purchases/components/PurchaseOrderTable";
import { usePagination, useToast } from "@/hooks";
import { Button, Chip, Select, SelectItem } from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from 'framer-motion';
import { DollarSign, MoveLeft, Package } from "lucide-react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const InvoicePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const toast = useToast();

  const purchaseId = Number(id);
  const { data } = useGetPurchaseOrder(purchaseId);
  const { mutateAsync } = useUpdatePurchaseOrderStatus();

  const { items, page, totalPages, setPage } = usePagination<PurchaseOrderRecordDTO>({
    data: data?.records ?? [],
    rowsPerPage: 10
  });

  const statuses = ["PENDING", "SHIPPED", "ARRIVED", "CANCELLED", "RETURNED"];

  const totalQuantity = data?.records.reduce((sum, item) => sum + item.quantity, 0);
  const totalUnitPrice = data?.records.reduce((sum, item) => sum + item.unitPrice, 0);
  const totalPrice = data?.records.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  const columns = useMemo<ColumnDef<PurchaseOrderRecordDTO>[]>(() => [
    { key: "productId", label: "Product ID" },
    { key: "productName", label: "Product Name" },
    { key: "unitPrice", label: "Unit Price" },
    { key: "quantity", label: "Quantity" }
  ], []);

  const handleStatusChange = async (keys: any) => {
    const newStatus = Array.from(keys)[0] as string;
    if (!newStatus || newStatus === data?.orderStatus) return;

    await toast.promise(
      mutateAsync({
        data: {
          purchaseId: purchaseId,
          status: (newStatus as UpdateStatusRequestStatus)
        }
      }),
      {
        loading: "Updating Status...",
        error: "Could not update status",
        success: "Status updated successfully"
      }
    );

    queryClient.invalidateQueries({ queryKey: getGetPurchaseOrderQueryKey(purchaseId) });
  };

  return (
    <ScrollContainer>
      <Header title={`PO #${id}`} />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
      >
        <Button
          variant="flat"
          color="primary"
          onPress={() => navigate("/purchasing")}
          startContent={<MoveLeft size={18} />}
        >
          Back to List
        </Button>

        <div className="w-full md:w-72">
          <Select
            label="Update Order Status"
            variant="bordered"
            disallowEmptySelection
            selectedKeys={new Set(data?.orderStatus ? [data.orderStatus] : [])}
            onSelectionChange={handleStatusChange}
            renderValue={(items) => {
              return items.map((item) => (
                <Chip
                  key={item.key}
                  className={statusColors[item.key as string]}
                  variant="flat"
                  size="sm"
                >
                  {item.textValue}
                </Chip>
              ));
            }}
          >
            {statuses.map((status) => (
              <SelectItem key={status} textValue={status}>
                {status}
              </SelectItem>
            ))}
          </Select>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SectionContainer>
          <StatCard
            statName="Total Items"
            statValue={data?.records.length || 0}
            icon={Package}
          />
          <StatCard
            statName="Total Quantity"
            statValue={totalQuantity || 0}
            icon={Package}
          />
          <StatCard
            statName="Total Unit Price"
            statValue={totalUnitPrice || 0}
            render={(value) => `$${Number(value).toFixed(2)}`}
            icon={DollarSign}
          />
          <StatCard
            statName="Total Price"
            statValue={totalPrice || 0}
            render={(value) => `$${Number(value).toFixed(2)}`}
            icon={DollarSign}
          />
        </SectionContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8"
      >
        <GenericTable
          columns={columns}
          getRowId={(item) => item.productId}
          items={items}
          sortColumn={"productId"}
          sortDirection={"ascending"}
          setSortColumn={(col) => dispatch(setSortColumn(col))}
          setSortDirection={(dir) => dispatch(setSortDirection(dir))}
          page={page}
          pages={totalPages}
          onChange={(page) => setPage(page)}
        />
      </motion.div>
    </ScrollContainer>
  );
};