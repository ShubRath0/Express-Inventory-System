import { GenericModal } from "@/components";
import { UpdateStockForm } from '../../components';
import { useModalActions, useProductActions } from "../../hooks";

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