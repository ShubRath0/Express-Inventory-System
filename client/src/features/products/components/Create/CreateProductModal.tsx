import { GenericModal } from "@/components";
import { CreateProductForm } from "@/features/products/components/Create/CreateProductForm";
import { useModalActions, useProductActions } from "@/features/products/hooks";

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