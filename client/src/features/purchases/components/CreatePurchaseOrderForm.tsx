import { type FormField, GenericForm } from "@/components";
import type { PurchaseOrder } from "@/features/purchases/api";

const purchaseOrderFields: FormField<PurchaseOrder>[] = [
    {
        key: "quantity",
        label: "Quantity",
        type: "number",
        required: true
    },
    {
        key: "truckCost",
        label: "Truck Cost",
        type: "number",
    },
    {
        key: "unitPrice",
        label: "Unit Price",
        type: "number",
        required: true
    },
    {
        key: "supplierName",
        label: "Supplier",
        type: "select",
        options: [
            { value: "1", label: "1" },
            { value: "2", label: "2" }
        ],
        required: true
    },
    {
        key: "note",
        label: "Notes",
        type: "text"
    }
];

export type ProductFormData = Pick<PurchaseOrder, "quantity" | "truckCost" | "unitPrice" | "supplierName" | "note">;

export type ProductFormProps = {
    onSubmit: (values: ProductFormData) => void;
};

export const CreatePurchaseOrderForm = ({ onSubmit }: ProductFormProps) => {
    return (
        <GenericForm
            fields={purchaseOrderFields}
            onSubmit={onSubmit}
            submitText="Create PO"
            submitColor="primary"
        />
    );
};