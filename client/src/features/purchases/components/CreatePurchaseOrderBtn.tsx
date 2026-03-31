import { useModalActions } from "@/hooks/useModalActions";
import { Button } from "@heroui/react";
import { Plus } from "lucide-react";

export const CreatePurchaseOrderBtn = () => {
    const { openModal } = useModalActions();
    return (
        <Button
            color="primary"
            radius="sm"
            size="lg"
            startContent={<Plus />}
            onPress={() => openModal('create')}
        >
            Create PO
        </Button>
    );
};