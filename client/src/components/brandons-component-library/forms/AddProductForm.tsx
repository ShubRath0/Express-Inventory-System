import type { Product } from "@/api/products/types";
import { GenericForm, type FormField } from "./GenericForm";

const productFields: FormField<Product>[] = [
    {
        key: "stock",
        label: "Stock",
        type: "number",
        required: true
    },
];

export type AddProductFormData = Pick<Product, 'stock', 'id'>;

export type AddProductFormProps = {
    onSubmit: (values: AddProductFormData) => void
}

export const AddProductForm = ({ onSubmit }: AddProductFormProps) => {
    return (
        <GenericForm
            fields={productFields}
            onSubmit={onSubmit}
            submitText="Update"
            submitColor="primary"
        />
    )
}