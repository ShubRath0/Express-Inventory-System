import { GenericAlert } from "@/components/brandons-component-library/alerts/GenericAlert"
import { Button } from "@heroui/react"

export type DeleteAlertProps = {
    isOpen: boolean
    handleDelete: () => void
    onOpenChange: (isOpen: boolean) => void
}

export const DeleteAlert = ({
    isOpen,
    handleDelete,
    onOpenChange
}: DeleteAlertProps) => {
    return (
        <GenericAlert
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            message="Are you sure you want to delete this product?"
            options={[
                <Button key="cancel" variant="light" color="primary" onPress={() => onOpenChange(false)}>No, go back</Button>,
                <Button key="confirm" variant="light" color="danger" onPress={() => { handleDelete(); onOpenChange(false) }}>Yes, delete</Button>
            ]}
        />
    )
}