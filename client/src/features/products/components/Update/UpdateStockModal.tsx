import { GenericModal } from "@/components";
import { UpdateStockForm, type UpdateStockFormData } from '../../components';

type UpdateStockModalProps = {
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
    onSubmit: (data: UpdateStockFormData) => void
}

export const UpdateStockModal = ({
    isOpen,
    onOpenChange,
    onSubmit
}: UpdateStockModalProps) => {
    return (
        <GenericModal
            title="Add Stock"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            {(onClose) => (
                <UpdateStockForm
                    onSubmit={(data) => {
                        onSubmit(data);
                        onClose();
                    }}
                />
            )}
        </GenericModal>
    )
}