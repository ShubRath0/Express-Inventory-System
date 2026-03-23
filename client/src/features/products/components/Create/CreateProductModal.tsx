import { CreateProductForm, type ProductFormData } from './CreateProductForm'
import { GenericModal } from "@/components";

type ProductModalProps = {
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
    onSubmit: (data: ProductFormData) => void
}

export const CreateProductModal = ({
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
                <CreateProductForm
                    onSubmit={(data) => {
                        onSubmit(data);
                        onClose();
                    }}
                />
            )}
        </GenericModal>
    )
}