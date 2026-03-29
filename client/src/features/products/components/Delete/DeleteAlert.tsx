import { GenericAlert } from "@/components/Generic/GenericAlert";
import { useModalActions, useProductActions } from "@/features/products/hooks";
import { Button } from "@heroui/react";

export const DeleteAlert = () => {
    const { activeModal, closeModal } = useModalActions();
    const { onDeleteProduct } = useProductActions();
    return (
        <GenericAlert
            isOpen={activeModal == 'delete'}
            onOpenChange={closeModal}
            message="Are you sure you want to delete this product?"
            title="Delete Product"
            options={[
                <Button key="cancel" variant="light" color="primary" onPress={closeModal}>No, go back</Button>,
                <Button key="confirm" variant="light" color="danger" onPress={onDeleteProduct}>Yes, delete</Button>
            ]}
        />
    );
};