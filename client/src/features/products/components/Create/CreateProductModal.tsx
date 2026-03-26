import { GenericModal } from "@/components";
import { useModalContext } from "../../context/ModalProvider";
import { CreateProductForm } from './CreateProductForm';

export const CreateProductModal = () => {

    const { activeModal, onCreateProduct, onOpenChange } = useModalContext();

    return (
        <GenericModal
            title="Create a Product"
            isOpen={activeModal === 'create'}
            onOpenChange={onOpenChange}
        >
            {() => (
                <CreateProductForm onSubmit={onCreateProduct} />
            )}
        </GenericModal>
    )
}