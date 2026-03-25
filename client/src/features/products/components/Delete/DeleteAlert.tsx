import { GenericAlert } from "@/components/Generic/GenericAlert";
import { Button } from "@heroui/react";
import { useModalContext } from "../../context/ModalProvider";

export const DeleteAlert = () => {
    const { activeModal, closeModal, onDeleteProduct, onOpenChange } = useModalContext();
    return (
        <GenericAlert
            isOpen={activeModal == 'delete'}
            onOpenChange={onOpenChange}
            message="Are you sure you want to delete this product?"
            title="Delete Product"
            options={[
                <Button key="cancel" variant="light" color="primary" onPress={closeModal}>No, go back</Button>,
                <Button key="confirm" variant="light" color="danger" onPress={onDeleteProduct}>Yes, delete</Button>
            ]}
        />
    )
}