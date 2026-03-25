import { GenericModal } from "@/components";
import { UpdateStockForm, type UpdateStockFormData } from '../../components';
import { useInventory } from "../../context";

interface UpdateStockModalProps {
    onSubmit: (data: UpdateStockFormData) => void,
}

export const UpdateStockModal = ({
    onSubmit,
}: UpdateStockModalProps) => {

    const { activeModal, closeModal } = useInventory();

    return (
        <GenericModal
            title="Modify Stock"
            isOpen={activeModal === 'update'}
            onOpenChange={(open) => { if (!open) closeModal() }}
        >
            {() => (
                <UpdateStockForm
                    onSubmit={(data) => {
                        onSubmit(data);
                        closeModal();
                    }}
                />
            )}
        </GenericModal>
    )
}