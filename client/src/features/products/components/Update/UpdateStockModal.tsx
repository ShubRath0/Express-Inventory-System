import { GenericModal } from "@/components";
import { UpdateStockForm } from '../../components';
import { useModalContext } from "../../context/ModalProvider";

export const UpdateStockModal = () => {

    const { activeModal, onUpdateStock, onOpenChange } = useModalContext();

    return (
        <GenericModal
            title="Modify Stock"
            isOpen={activeModal === 'update'}
            onOpenChange={onOpenChange}
        >
            {() => (
                <UpdateStockForm onSubmit={onUpdateStock} />
            )}
        </GenericModal>
    )
}