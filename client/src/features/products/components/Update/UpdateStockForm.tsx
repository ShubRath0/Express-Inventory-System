import { type FormField, GenericForm } from "@/components";
import type { ModifyStockRequest } from "@/features/products/api";
import { useModalActions } from "@/hooks/useModalActions";
import { Chip } from "@heroui/react";


const STOCK_REASONS = ["Spoilage", "Miscount", "Damaged", "Testing", "Yield Loss", "Found"] as const;

const productFields: FormField<ModifyStockRequest>[] = [
    {
        key: "stock",
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

export type ModifyStockForm = {
    onSubmit: (values: ModifyStockRequest) => void,
};

export const UpdateStockForm = ({ onSubmit }: ModifyStockForm) => {

    const { activeData } = useModalActions();

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
                        <span>Current: {activeData?.stock || 0}</span>
                        <span className="text-default-300">→</span>
                        <span className="font-bold text-default-900">
                            {(activeData?.stock || 0) + (Number(values.stock) || 0)}
                        </span>
                    </div>

                    <div className="ml-2">
                        {values.stock && values.stock !== 0 && (
                            <Chip color={values.stock > 0 ? 'success' : 'danger'}>
                                <div className="flex items-center">
                                    {values.stock > 0 ? '+' : '-'}
                                    {Math.abs(values.stock)}
                                </div>
                            </Chip>
                        )}
                    </div>
                </div>
            )}
        </GenericForm>
    );
};