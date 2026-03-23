import type { Product } from "../../api";
import { GenericForm, type FormField } from "@/components";

const productFields: FormField<Product>[] = [
    {
        key: "stock",
        label: "Stock",
        type: "number",
        required: true
    },
];

export type UpdateStockFormData = {
    id: number,
    stock: number
}

export type UpdateStockFormProps = {
    onSubmit: (values: UpdateStockFormData) => void
}

export const UpdateStockForm = ({ onSubmit }: UpdateStockFormProps) => {
    return (
        <GenericForm
            fields={productFields}
            onSubmit={onSubmit}
            submitText="Update"
            submitColor="primary"
        />
    )
}