import { useInventory } from '../../context';
import { CreateProductForm, type ProductFormData } from './CreateProductForm'
import { GenericModal } from "@/components";

type ProductModalProps = {
    onSubmit: (data: ProductFormData) => void
}

export const CreateProductModal = ({
    onSubmit
}: ProductModalProps) => {

    const { activeModal, closeModal } = useInventory();

    return (
        <GenericModal
            title="Create a Product"
            isOpen={activeModal === 'create'}
            onOpenChange={(open) => { if (!open) closeModal() }}
        >
            {() => (
                <CreateProductForm
                    onSubmit={(data) => {
                        onSubmit(data);
                        closeModal();
                    }}
                />
            )}
        </GenericModal>
    )
}