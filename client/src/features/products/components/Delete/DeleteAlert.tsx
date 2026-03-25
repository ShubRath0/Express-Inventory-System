import { GenericAlert } from "@/components/Generic/GenericAlert"
import { Button } from "@heroui/react"
import { useInventory } from "../../context"

export type DeleteAlertProps = {
    handleDelete: () => void
}

export const DeleteAlert = ({
    handleDelete,
}: DeleteAlertProps) => {

    const { activeModal, closeModal } = useInventory();

    return (
        <GenericAlert
            isOpen={activeModal == 'delete'}
            onOpenChange={(open) => { if (!open) closeModal() }}
            message="Are you sure you want to delete this product?"
            title="Delete Product"
            options={[
                <Button key="cancel" variant="light" color="primary" onPress={() => closeModal()}>No, go back</Button>,
                <Button key="confirm" variant="light" color="danger" onPress={() => { handleDelete(); closeModal() }}>Yes, delete</Button>
            ]}
        />
    )
}