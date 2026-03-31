import { GenericModal } from "@/components";
import { UpdateStockForm } from "@/features/products/components/Update/UpdateStockForm";
import { useProductActions } from "@/features/products/hooks";
import { useModalActions } from "@/hooks/useModalActions";

export const UpdateStockModal = () => {

    const { activeModal, closeModal } = useModalActions();
    const { onUpdateStock } = useProductActions();

    return (
        <GenericModal
            title="Modify Stock"
            isOpen={activeModal === 'update'}
            onOpenChange={closeModal}
        >
            {() => (
                <UpdateStockForm onSubmit={onUpdateStock} />
            )}
        </GenericModal>
    );
};