import { CreateProductModal } from "@/features/products/components/Create/CreateProductModal";
import { useModalActions } from "@/features/products/hooks";
import { Button } from "@heroui/react";
import { Plus } from "lucide-react";

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