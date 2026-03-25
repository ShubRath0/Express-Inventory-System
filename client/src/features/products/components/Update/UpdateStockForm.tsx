import type { Product } from "../../api";
import { GenericForm, type FormField } from "@/components";
import { useInventory } from "../../context";
import { Chip } from "@heroui/react";

const STOCK_REASONS = ["Spoilage", "Miscount", "Damaged", "Testing", "Yield Loss", "Found"] as const;
type StockReason = (typeof STOCK_REASONS)[number]

interface UpdateStockFields extends Product {
    reason: StockReason | null;
    adjustmentAmount: number;
}

const productFields: FormField<UpdateStockFields>[] = [
    {
        key: "adjustmentAmount",
        label: "Adjustment",
        type: "number",
        required: true
    },
    {
        key: "reason",
        label: "Reason",
        type: "select",
        required: true,
        options: STOCK_REASONS.map(r => ({ label: r, value: r }))
    }
];

export type UpdateStockFormData = {
    id: number,
    stock: number
}

export type UpdateStockFormProps = {
    onSubmit: (values: UpdateStockFormData) => void,
}

export const UpdateStockForm = ({ onSubmit }: UpdateStockFormProps) => {

    const { selectedProduct } = useInventory();

    console.log(selectedProduct)

    return (
        <GenericForm
            fields={productFields}
            onSubmit={onSubmit}
            submitText="Update"
            submitColor="primary"
        >
            {(values) => (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-default-500">
                        <span>Current: {selectedProduct?.stock || 0}</span>
                        <span className="text-default-300">→</span>
                        <span className="font-bold text-default-900">
                            {(selectedProduct?.stock || 0) + (Number(values.adjustmentAmount) || 0)}
                        </span>
                    </div>

                    {values.adjustmentAmount && values.adjustmentAmount !== 0 && (
                        <Chip color={values.adjustmentAmount > 0 ? 'success' : 'danger'} className="ml-2">
                            {values.adjustmentAmount > 0 ? '+' : ''}{values.adjustmentAmount}
                        </Chip>
                    )}
                </div>
            )}
        </GenericForm>
    )
}