import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import { useModalActions } from "../../hooks";
import { CreateProductModal } from "./CreateProductModal";

export const CreateProductBtn = () => {
    const { openModal } = useModalActions();

    return (
        <>
            <Button
                color="primary"
                variant="solid"
                radius="sm"
                onPress={() => openModal('create')}
                size="lg"
                startContent={<Plus />}
            >
                Add Item
            </Button>

            <CreateProductModal />
        </>
    );
};