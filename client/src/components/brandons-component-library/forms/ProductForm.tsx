import type { Product } from "@/api/products/types";
import { GenericForm, type FormField } from "./GenericForm";

const productFields: FormField<Product>[] = [
    {
        key: "name",
        label: "Product Name",
        type: "text",
        required: true
    },
    {
        key: "category",
        label: "Product Type",
        type: "select",
        required: true,
        options: [
            { value: "PRODUCE", label: "Produce" },
            { value: "PLASTIC", label: "Plastic" }
        ] as const
    },
    {
        key: "stock",
        label: "Stock",
        type: "number",
        required: true
    },
    {
        key: "lowStockThreshold",
        label: "Low Stock Threshold",
        type: "number",
        required: true
    },
    {
        key: "price",
        label: "Unit Price",
        placeholder: "0.00",
        type: "number",
        required: true
    }
];

export type ProductFormData = Pick<Product, 'name' | 'category' | 'stock' | 'lowStockThreshold' | 'price'>;

export type ProductFormProps = {
    onSubmit: (values: ProductFormData) => void
}

export const ProductForm = ({ onSubmit }: ProductFormProps) => {
    return (
        <GenericForm
            fields={productFields}
            onSubmit={onSubmit}
            submitText="Create Product"
            submitColor="primary"
        />
    )
}