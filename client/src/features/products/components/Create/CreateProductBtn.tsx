import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import { useModalContext } from "../../context/ModalProvider";
import { CreateProductModal } from "./CreateProductModal";

export const CreateProductBtn = () => {
    const { openModal } = useModalContext();

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