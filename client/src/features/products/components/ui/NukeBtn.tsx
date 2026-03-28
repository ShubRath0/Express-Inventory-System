import { useProductActions } from "@/features/products/hooks";
import { Button } from "@heroui/react";
import { Save } from "lucide-react";

export const NukeBtn = () => {

    const { onDeleteEverything } = useProductActions();

    return (
        <Button
            color="success"
            size="lg"
            radius="sm"
            startContent={<Save />}
            onPress={onDeleteEverything}
        >
            Save
        </Button>
    );
};