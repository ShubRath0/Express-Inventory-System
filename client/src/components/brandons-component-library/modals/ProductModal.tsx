import { ProductForm, type ProductFormData } from '@/components/brandons-component-library/forms/ProductForm'
import { GenericModal } from "./GenericModal";

type ProductModalProps = {
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
    onSubmit: (data: ProductFormData) => void
}

export const ProductModal = ({
    isOpen,
    onOpenChange,
    onSubmit
}: ProductModalProps) => {
    return (
        <GenericModal
            title="Create a Product"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            {(onClose) => (
                <ProductForm
                    onSubmit={(data) => {
                        onSubmit(data);
                        onClose();
                    }}
                />
            )}
        </GenericModal>
    )
}