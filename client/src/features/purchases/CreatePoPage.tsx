import { useGetAllProducts } from "@/api/__generated__/product-controller/product-controller";
import { useCreatePurchaseOrder } from "@/api/__generated__/purchase-controller/purchase-controller";
import { type ColumnDef, GenericTable, Header, ScrollContainer } from "@/components";
import { useDebounce, useToast } from "@/hooks";
import { Autocomplete, AutocompleteItem, Button, Input } from "@heroui/react";
import { motion } from "framer-motion";
import { MoveLeft, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface PurchaseOrderRecordDTO {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface TableItem extends PurchaseOrderRecordDTO {
  rowId: string;
}

export const CreatePoPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [filterText, setFilterText] = useState("");
  const [quantity, setQuantity] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<string>("");

  const [poItems, setPoItems] = useState<TableItem[]>([]);

  const [sortColumn, setSortColumn] = useState<keyof TableItem | undefined>("productName");
  const [sortDirection, setSortDirection] = useState<"ascending" | "descending">("ascending");

  const debouncedSearch = useDebounce(filterText, 300);
  const { data, isLoading } = useGetAllProducts({ search: debouncedSearch });
  const products = data?.data?.content ?? [];
  const { mutateAsync } = useCreatePurchaseOrder();

  const columns: ColumnDef<TableItem>[] = [
    { key: "productName", label: "PRODUCT", allowSorting: true },
    { key: "quantity", label: "QTY", allowSorting: true },
    {
      key: "unitPrice",
      label: "UNIT PRICE",
      allowSorting: true,
      render: (value) => `$${Number(value).toFixed(2)}`
    },
    {
      key: "total",
      label: "TOTAL",
      virtual: true,
      renderVirtual: (item) => `$${(item.quantity * item.unitPrice).toFixed(2)}`
    },
    {
      key: "actions",
      label: " ",
      virtual: true,
      renderVirtual: (item) => (
        <Button
          isIconOnly
          variant="light"
          color="danger"
          onPress={() => setPoItems(prev => prev.filter(i => i.rowId !== item.rowId))}
        >
          <Trash2 size={18} />
        </Button>
      )
    }
  ];

  const handleAddItem = () => {
    if (!selectedProductId || !quantity || !totalPrice) return;

    const selectedProduct = products.find(
      (p) => String(p.id) === selectedProductId
    );
    const qty = Number(quantity);
    const total = Number(totalPrice);

    const newItem: TableItem = {
      rowId: crypto.randomUUID(),
      productId: Number(selectedProductId),
      productName: selectedProduct?.name || "Unknown",
      quantity: qty,
      unitPrice: total / qty,
    };

    setPoItems((prev) => [...prev, newItem]);

    setSelectedProductId(null);
    setFilterText("");
    setQuantity("");
    setTotalPrice("");
  };

  const onSubmit = async () => {
    const totalQuantity = poItems.reduce((sum, item) => sum + item.quantity, 0);
    const orderPrice = poItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

    const records: PurchaseOrderRecordDTO[] = poItems.map(({ rowId, ...rest }) => rest);
    const payload = {
      orderPrice,
      orderStatus: "PENDING",
      records,
      totalQuantity,
    };

    await toast.promise(mutateAsync({ data: payload }), {
      loading: "Creating PO...",
      error: "Failed to create PO",
      success: "PO created successfully!"
    }).then(() => {
      setPoItems([]);
      navigate("/purchasing");
    });

    navigate("/purchasing");
  };

  return (
    <ScrollContainer>
      <Header title="Create PO" />

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.3, ease: "backInOut" }}
      >
        <Button color="primary" onPress={() => navigate("/purchasing")}>
          <MoveLeft />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.3, ease: "backInOut" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <Autocomplete
            label="Product"
            variant="bordered"
            isLoading={isLoading}
            selectedKey={selectedProductId}
            onSelectionChange={(key) => {
              const k = key ? String(key) : null;
              setSelectedProductId(k);
              const p = products.find(prod => String(prod.id) === k);
              if (p) setFilterText(p.name);
            }}
            inputValue={filterText}
            onInputChange={setFilterText}
            items={products}
          >
            {(item) => (
              <AutocompleteItem key={String(item.id)} textValue={item.name}>
                {item.name}
              </AutocompleteItem>
            )}
          </Autocomplete>

          <Input
            label="Quantity"
            type="number"
            variant="bordered"
            value={quantity}
            onValueChange={setQuantity}
          />

          <div className="flex gap-2 items-end">
            <Input
              label="Total Price"
              type="number"
              variant="bordered"
              startContent={<span className="text-default-400 text-small">$</span>}
              value={totalPrice}
              onValueChange={setTotalPrice}
            />
            <Button
              color="primary"
              isIconOnly
              className="h-14 w-14 min-w-14"
              onPress={handleAddItem}
            >
              <Plus />
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="p-6 space-y-8">


        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: "backInOut" }}
        >
          <GenericTable
            items={poItems}
            columns={columns}
            getRowId={(item) => item.rowId}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            setSortColumn={setSortColumn as any}
            setSortDirection={setSortDirection}
          />
        </motion.div>


        {poItems.length > 0 && (
          <div className="flex justify-end">
            <Button color="success" className="text-white px-12" onPress={onSubmit}>
              Submit Purchase Order
            </Button>
          </div>
        )}
      </div>
    </ScrollContainer>
  );
};