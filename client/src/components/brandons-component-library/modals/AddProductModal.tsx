import { GenericModal } from "./GenericModal";
import { AddProductForm, type AddProductFormData } from '../forms/AddProductForm';

type ProductModalProps = {
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
    onSubmit: (data: AddProductFormData) => void
}

export const AddProductModal = ({
    isOpen,
    onOpenChange,
    onSubmit
}: ProductModalProps) => {
    return (
        <GenericModal
            title="Add Stock"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            {(onClose) => (
                <AddProductForm
                    onSubmit={(data) => {
                        onSubmit(data);
                        onClose();
                    }}
                />
            )}
        </GenericModal>
    )
}