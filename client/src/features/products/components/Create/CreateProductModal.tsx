import { GenericModal } from "@/components";
import { CreateProductForm } from "@/features/products/components/Create/CreateProductForm";
import { useProductActions } from "@/features/products/hooks";
import { useModalActions } from "@/hooks/useModalActions";

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