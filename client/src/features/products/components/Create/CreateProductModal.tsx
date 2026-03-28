import { GenericModal } from "@/components";
import { useModalActions, useProductActions } from "../../hooks";
import { CreateProductForm } from './CreateProductForm';

export const CreateProductModal = () => {

    const { activeModal, closeModal } = useModalActions();
    const { onCreateProduct } = useProductActions();

    return (
        <GenericModal
            title="Create a Product"
            isOpen={activeModal === 'create'}
            onOpenChange={closeModal}
        >
            {() => (
                <CreateProductForm onSubmit={onCreateProduct} />
            )}
        </GenericModal>
    );
};